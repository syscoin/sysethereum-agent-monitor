const app = require('express')();
const cors = require('cors');

const nodemailer = require('nodemailer');
const os = require('os');

const config = require('./config');
const utils = require('./utils');
const constants = require('./constants');

let mailConfig = utils.configMailer(config);
let transporter = nodemailer.createTransport(mailConfig);
let checkInterval;

// see if we have existing uptime data
let uptime = utils.readFile(constants.UPTIME_FILE);
if(!isNaN(parseFloat(uptime))) {
  console.log('UPTIME:', uptime);
  // get current uptime and see if we've restarted
  if (os.uptime() < uptime) {
    utils.sendMail(transporter, require('./messages/agent_os_restarted'));
  }

  // update the uptime
  utils.writeFile(constants.UPTIME_FILE, os.uptime());
} else {
  uptime = os.uptime();
  utils.writeFile(constants.UPTIME_FILE, uptime);
  console.log('Writing initial uptime of ', uptime);
}

async function checkForAlerts(mailer) {
  const processStatus = await utils.checkProcessDown(mailer);
  const sysStatus = await utils.checkSyscoinChainTips(mailer);
  const ethStatus = await utils.checkEthereumChainHeight(mailer);

  return { ...processStatus, sysStatus, ethStatus };
}

// passive status checking
checkInterval = setInterval(checkForAlerts, config.interval * 1000, transporter);

// webserver for proactive checks
app.use(cors());
app.get('/status', async (req, res) => {
  const status = await checkForAlerts(transporter);

  return res.send({ ...status});
});

app.listen(config.port);
console.log(`Sysethereum agent monitor started with config ${config}`);


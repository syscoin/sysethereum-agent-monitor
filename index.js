const app = require('express')();
const cors = require('cors');

const nodemailer = require('nodemailer');
const os = require('os');

const config = require('./config');
const utils = require('./utils');
const constants = require('./constants');

let mailConfig = utils.configMailer(config);
let transporter = nodemailer.createTransport(mailConfig);

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

app.use(cors());
app.get('/status', async (req, res) => {
  const processStatus = await utils.checkProcessDown(transporter);
  const sysStatus = await utils.checkSyscoinChainTips(transporter);
  const ethStatus = await utils.checkEthereumChainHeight(transporter);

  return res.send({ ...processStatus, sysStatus, ethStatus });
})

app.listen(config.port);

const app = require('express')();
const cors = require('cors');

const nodemailer = require('nodemailer');
const os = require('os');

const config = require('./config');
const utils = require('./utils');
const constants = require('./constants');
const { stopAndRestart } = require('./processUtils');

let mailConfig = utils.configMailer(config);
let transporter = nodemailer.createTransport(mailConfig);
let checkInterval;
let isAttemptingRestart = false;

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

async function checkForAlerts(mailer, skipMail) {
  const processStatus = await utils.checkProcessDown();
  const sysStatus = await utils.checkSyscoinChainTips();
  const ethStatus = await utils.checkEthereumChainHeight();
  const statusResult = { ...processStatus, sysStatus, ethStatus };

  if (config.enable_autorestart && !isAttemptingRestart && processStatus.isError || sysStatus.isError || ethStatus.isError) {
    isAttemptingRestart = true;
    console.log('Attempting restart!!!');
    const result = await stopAndRestart();

    if(result) {
      // restart worked
      console.log('seems like restart worked!');
      startCheckInterval();
    } else {
      console.log("Something went wrong with restart.");
      config.enable_autorestart = false; //disable autorestart until a human comes and helps

      //message the human

      //restart the checker so that they keep getting messages until they fix it

    }

  } else if (!skipMail) {
    if (isAttemptingRestart) {
      isAttemptingRestart = false;
    }

    if (config.enable_mail && config.enable_autorestart && processStatus.isError) {
      let processName;
      Object.keys(processStatus).forEach(key => {
        if(key !== 'isError' && !proessStatus[key]) {
          processName = key;
        }
      });
      let info = await utils.sendMail(mailer, require('./messages/agent_process_down'));
      console.log(`${processName.toUpperCase()} DOWN! Sending email. ${info}`);
      return;
    }

    if (config.enable_mail && config.enable_autorestart && sysStatus.isError) {
      const tokenObj = {
        local: JSON.stringify(sysStatus.local),
        remote: JSON.stringify(sysStatus.remote)
      };
      await utils.sendMail(mailer, require('./messages/agent_sys_chain_mismatch'), tokenObj);
      return;
    }

    if (config.enable_mail && config.enable_autorestart && ethStatus.isError) {
      const tokenObj = {
        local: JSON.stringify(ethStatus.local),
        remote: JSON.stringify(ethStatus.remote)
      };
      await utils.sendMail(mailer, require('./messages/agent_eth_chain_height'), tokenObj);
      return;
    }
  }

  return statusResult;
}

function startCheckInterval() {
  // passive status checking
  checkInterval = setInterval(checkForAlerts, config.interval * 1000, transporter);
}

startCheckInterval();

// webserver for proactive checks
app.use(cors());
app.get('/status', async (req, res) => {
  const status = await checkForAlerts(transporter, true);

  return res.send({ ...status});
});

app.listen(config.port);
console.log(`Sysethereum agent monitor started with config ${JSON.stringify(config)}`);


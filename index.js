const nodemailer = require('nodemailer'),
  os = require('os');
const config = require('./config'),
  utils = require('./utils'),
  constants = require('./constants');

let mailConfig = {
  host: config.smtp.host,
  secure: false,
  port: config.smtp.port,
  tls: {
    rejectUnauthorized: false
  }
};

// if we have non-empty auth, use it
if(config.smtp.auth.user !== '' && config.smtp.auth.pass !== '') {
  mailConfig.auth = config.smtp.auth
}

let transporter = nodemailer.createTransport(mailConfig);
let processDownInterval;

// see if we have existing uptime data
let uptime = utils.readFile(constants.UPTIME_FILE);
if(!isNaN(parseFloat(uptime))) {
  console.log('UPTIME:', uptime);
  // get current uptime and see if we've restarted
  if (os.uptime() < uptime) {
    utils.sendMail(transporter, require('./messages/agent_os_restarted'));
  } else {
    // update the uptime
    utils.writeFile(constants.UPTIME_FILE, os.uptime());
  }
} else {
  uptime = os.uptime();
  utils.writeFile(constants.UPTIME_FILE, uptime);
  console.log('Writing initial uptime of ', uptime);
}

async function checkForAlerts(mailer) {
  //await utils.checkProcessDown(mailer);
  await utils.checkForCorrectChain(mailer);
}

processDownInterval = setInterval(checkForAlerts, config.interval * 1000, transporter);





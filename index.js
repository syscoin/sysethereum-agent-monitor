const nodemailer = require('nodemailer');
const find = require('find-process');

const config = require('./config');

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
async function checkProcessDown() {
  console.log('Checking sysethereum-agent process status');
  let list = await find('name', 'sysethereum-agents', false);

  if(list.length === 0) {
    const message = require('./message_agent_process_down').message;
    transporter.sendMail(message).then(info => {
      console.log('Preview URL: ' + JSON.stringify(info));
    });
  } else {
    console.log(`${list.length} running sysethereum-agents, no action needed.`);
  }
  clearInterval(processDownInterval);
}

processDownInterval = setInterval(checkProcessDown, 5000);





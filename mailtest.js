const nodemailer = require('nodemailer');
const config = require('./config.local');
const utils = require('./utils');

const toAddress = process.argv[2];
if (!toAddress) {
  console.error('No email address provided for text.');
  process.exit(0);
}

let message =  {
  from: 'dwasyluk@blockchainfoundry.co',
  to: toAddress,
  subject: 'Sysetehreum Agent Monitor Test Email',
  text: 'Sysetehreum Agent Monitor Test Email',
  html: '<p>Sysetehreum Agent Monitor Test Email</p>'
};

const mailConfig = utils.configMailer(config);
let transporter = nodemailer.createTransport(mailConfig);
utils.sendMail(transporter, message).then(info => {
  console.log('Sendmail test: ' + JSON.stringify(info));
});

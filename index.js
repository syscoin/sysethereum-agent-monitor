const nodemailer = require('nodemailer');
const config = require('./config');

let mailConfig;
if (process.env.NODE_ENV === 'production' ){
  // all emails are delivered to destination
  mailConfig = {
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
      user: 'real.user',
      pass: 'verysecret'
    }
  };
} else {
  // all emails are catched by ethereal.email
  mailConfig = {
    host: 'localhost',
    secure: false,
    port: 25,
  
tls: {
        rejectUnauthorized: false
    }
  };
}

  let transporter = nodemailer.createTransport(mailConfig);

  let message = {
    from: 'alert@explorer-testnet.blockchainfoundry.co',
    to: 'dwasyluk@blockchainfoundry.co',
    subject: 'Message title',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>'
  };
  transporter.sendMail(message).then(info=>{
    console.log('Preview URL: ' + JSON.stringify(info));
  });

//const find = require('find-process');
//
//find('name', 'Syscoin', false)
//  .then(function (list) {
//    console.log('there are %s nginx process(es)', list.length, list);
//  });
//
//
//

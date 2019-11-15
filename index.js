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
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'ethereal.user@ethereal.email',
      pass: 'verysecret'
    }
  };
}

nodemailer.createTestAccount((err, account) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass  // generated ethereal password
    }
  });

  let message = {
    from: 'sender@server.com',
    to: 'receiver@sender.com',
    subject: 'Message title',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>'
  };
  transporter.sendMail(message).then(info=>{
    console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
  });
});

const find = require('find-process');

find('name', 'Syscoin', false)
  .then(function (list) {
    console.log('there are %s nginx process(es)', list.length, list);
  });




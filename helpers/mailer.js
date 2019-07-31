const nodemailer = require('nodemailer');
const { supportBlugrassMedia } = require('../config/keys');
const generateContactUsMail = require('./generateContactUsMail');

module.exports.sendContactUsMail = async (contactUsForm) => {
  const emailBody = await generateContactUsMail(contactUsForm);
  nodemailer.createTestAccount((err, account) => {
    if (err) {
      console.log(err);
    } else {
      const transporter = nodemailer.createTransport({
        host: supportBlugrassMedia.host,
        port: supportBlugrassMedia.port,
        secure: supportBlugrassMedia.secure,
        auth: {
          user: supportBlugrassMedia.user,
          pass: supportBlugrassMedia.password,
        },
      });
  
      const mailOptions = {
        from: 'bluegrass.media <support@bluegrass.media>',
        to: 'bluegrassmedia@fastmail.com',
        subject: 'Contact Us',
        html: emailBody,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Contact Us Email Sent : %s', info.response);
      });
    }
  });
};

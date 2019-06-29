const nodemailer = require('nodemailer');
const { contactRulingsLaw } = require('../config/keys');
const generateVerificationEmail = require('./generateverificationemail');
const generateResetPasswordEmail = require('./generateresetpasswordemail');

module.exports.sendVerificationMail = (userEmail, verificationToken) => {
  const emailBody = generateVerificationEmail(verificationToken);
  nodemailer.createTestAccount((err, account) => {
    const transporter = nodemailer.createTransport({
      host: contactRulingsLaw.host,
      port: contactRulingsLaw.port,
      secure: contactRulingsLaw.secure,
      auth: {
        user: contactRulingsLaw.user,
        pass: contactRulingsLaw.password,
      },
    });

    const mailOptions = {
      from: 'rulings.law <contact@rulings.law>',
      to: userEmail,
      subject: 'Verify your email address',
      html: emailBody,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Verification Email Sent : %s', info.response);
    });
  });
};

module.exports.sendResetPasswordMail = (userEmail, verificationToken) => {
  const emailBody = generateResetPasswordEmail(verificationToken);
  nodemailer.createTestAccount((err, account) => {
    const transporter = nodemailer.createTransport({
      host: contactRulingsLaw.host,
      port: contactRulingsLaw.port,
      secure: contactRulingsLaw.secure,
      auth: {
        user: contactRulingsLaw.user,
        pass: contactRulingsLaw.password,
      },
    });

    const mailOptions = {
      from: 'rulings.law <contact@rulings.law>',
      to: userEmail,
      subject: 'Reset your password',
      html: emailBody,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Reset Password Email Sent : %s', info.response);
    });
  });
};

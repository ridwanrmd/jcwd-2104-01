require('dotenv').config();
const nodemailer = require('nodemailer');

const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;

const courier = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'ridwan95rmd@gmail.com',
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
  },
});

const sendMail = async ({ email, token }) => {
  const mail = {
    from: 'Medbox Developer <ridwan95rmd@gmail.com>',
    to: email,
    subject: 'Account Verification',
    html: `<h1>Hello, click this <a href="http://localhost:6969/users/verification/${token}">link</a> to verify your account</h1>`,
  };
  try {
    await courier.sendMail(mail);
    console.log('Email berhasil dikirim');
  } catch (error) {
    throw error;
  }
};

const sendForgotPasswordMail = async ({ email, token, first_name }) => {
  const mail = {
    from: 'Medbox Developer <ridwan95rmd@gmail.com>',
    to: email,
    subject: 'Medbox Forgot Password',
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <p>Hi ${first_name}</p>
        <p>Plase click this <a href="http://localhost:3000/forgot-password/${token}">link</a> to create your new password</p>
      </body>
    </html>`,
  };
  try {
    await courier.sendMail(mail);
    console.log(`Email Forgot Password sent to ${email}`);
  } catch (error) {
    throw error;
  }
};

module.exports = { sendMail, sendForgotPasswordMail };

const nodemailer = require('nodemailer');
const { google } = require('googleapis');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: process.cwd() + '/.env.development' });
}

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_SMTP_CLIENT_ID,
  process.env.GOOGLE_SMTP_CLIENT_SECRET,
  process.env.GOOGLE_SMTP_REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_SMTP_REFRESH_TOKEN });

const sendMail = async options => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'support@305gm.com',
        clientId: process.env.GOOGLE_SMTP_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SMTP_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_SMTP_REFRESH_TOKEN,
        accessToken,
      },
    });

    const result = await transporter.sendMail(options);
    return result;
  } catch (err) {
    console.log(`err while trying to send mail: `, err);
  }
};

module.exports = { sendMail };

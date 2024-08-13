import nodemailer from 'nodemailer';
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_NAME,
    pass: process.env.APP_PASSWORD,
  },
});

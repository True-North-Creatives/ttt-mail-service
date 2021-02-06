import nodemailer from 'nodemailer';
import compiler from './compiler';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hi@timetotrain.fit',
    pass: process.env.GPASS,
  },
});

//default destination
const dest = 'hi@timetotrain.fit';

const mailOptions = {
  from: 'Don\'t reply <hi@timetotrain.fit>',
  to: dest,
  subject: 'Something went wrong',
  html: '<p>Please ignore!. Server Error</p>',
};

const mailService = ({
  templateName, from, to, subject,
}, payload) => {
  const html = compiler(templateName, payload);

  const result = transporter.sendMail({
    ...mailOptions, html, from, to, subject,
  });
  return result;
};

export default mailService;

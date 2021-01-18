import nodemailer from 'nodemailer';
import compiler from './compiler.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hi@timetotrain.fit',
    pass: 'gebqopdsfgmwvkfu',
  },
});
const dest = 'gangulaar.icon@gmail.com';

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

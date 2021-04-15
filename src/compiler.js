import fs from 'fs';

const compiler = (templateName, payload) => {
  const mail = fs.readFileSync(`./src/templates/${templateName}.html`);
  let template = mail.toString();
  Object.keys(payload).forEach((key) => {
    template = template.replace(
      new RegExp(`{{${key}}}`, 'g'),
      payload[key],
    );
  });
  return template;
};

export default compiler;

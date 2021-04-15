import nodemailer from "nodemailer";
import logger from "ttt-packages/lib/config/logger";
import compiler from "./compiler";

/**
 * https://stackoverflow.com/questions/24098461/nodemailer-gmail-what-exactly-is-a-refresh-token-and-how-do-i-get-one
 */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "hi@timetotrain.fit",
    clientId:
      "570371664823-edlmccd1m4q0t6tobqilhkh3vh3km0oc.apps.googleusercontent.com",
    clientSecret: "v_dyD0beWl__3RYlSk0dIHrb",
    refreshToken:
      "1//048LYmNbQxzHDCgYIARAAGAQSNwF-L9IrDEHSAqdxIjnKvHqF6cHbhRGTXUNViYMGTK3Blc6UQJ-4M3nlKXTO1IM3wRNWQawtD5U",
    accessToken:
      "ya29.a0AfH6SMBcrYwfOhv3gsYXVR6k3BX62_20-yPUhYDiGjjdVRu0PGMLEL3sXF3aOOSdr6nkMeFmk7b6p5X3OPBklJxJA0XwkoPVpi2ym8DRwqD_uTOWfajgF65JEkeIn61CuhDqfPW0-2nPIBhHMW0QLkbtptwu",
    pass: process.env.GPASS,
  },
});

//default destination
const dest = "hi@timetotrain.fit";

const mailOptions = {
  from: "Don't reply <hi@timetotrain.fit>",
  to: dest,
  subject: "Something went wrong",
  html: "<p>Please ignore!. Server Error</p>",
};

const mailService = async ({ templateName, from, to, subject }, payload) => {
  const html = compiler(templateName, payload);
  const result = await transporter.sendMail({
    ...mailOptions,
    html,
    from,
    to,
    subject,
  });
  return result;
};

export default mailService;

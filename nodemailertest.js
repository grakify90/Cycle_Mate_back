const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_GMAIL,
    pass: process.env.PASSWORD_GMAIL,
  },
  debug: true, // show debug output
  logger: true, // log information in console
});

transporter.use(
  "compile",
  hbs({
    viewEngine: "express-handlebars",
    //CHANGE TO CORRECT PATH!
    viewPath: "./",
  })
);

let mailOptions = {
  from: '"Cycle Mate" <cyclemate137@gmail.com>',
  to: "ninavanes1990@hotmail.com",
  subject: "Welcome to Cycle Mate!",
  text: "Plain text version of the html",
  attachments: [{ filename: "cyclemate.jpg", path: "./cyclemate.jpg" }],
  template: "main",
  //Passing variables to email template
  context: {
    name: "Nina",
  },
};

transporter.sendMail(mailOptions, (error, data) => {
  if (error) {
    return console.log("Error occurred", error);
  }
  console.log("Email sent: %s", data.messageId);
});

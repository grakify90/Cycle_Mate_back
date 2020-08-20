const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
// require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: { email },
    pass: { password },
  },
  debug: true, // show debug output
  logger: true, // log information in console
});

//using template
transporter.use(
  "compile",
  hbs({
    viewEngine: "express-handlebars",
    //change to correct path
    viewPath: "./",
  })
);

let mailOptions = {
  from: '"Cycle Mate" <cyclemate137@gmail.com>',
  to: "pass email here",
  subject: "Welcome to Cycle Mate!",
  text: "Plain text version of the html",
  attachments: [{ filename: "cyclemate.jpg", path: "./cyclemate.jpg" }],
  template: "main",
  //Passing variables to email template
  context: {
    name: "Test test",
  },
};

transporter.sendMail(mailOptions, (error, data) => {
  if (error) {
    return console.log("Error occurred", error);
  }
  console.log("Email sent: %s", data.messageId);
});

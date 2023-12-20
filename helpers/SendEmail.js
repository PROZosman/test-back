
const nodemailer = require("nodemailer");

async function SendEmail(email,verify, template) {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'engosmanhossain100@gmail.com',
      pass: 'xpwcmxrkdlnyxfrc'
    }
  });
  
  const info = await transporter.sendMail({
    from: 'engosmanhossain100@gmail.com', // sender address
    to: email, // list of receivers
    subject: "verifiy email", // Subject line
    html: template(verify), // html body
  });
}

module.exports = SendEmail


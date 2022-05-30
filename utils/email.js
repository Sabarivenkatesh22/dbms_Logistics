// const nodemailer = require('nodemailer');
const sgMail = require("@sendgrid/mail");
const pug = require('pug');
const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
const env = require('dotenv');
env.config();


module.exports = class Email {
  constructor(user, otp) {
    // this.to = "arumugammason11@gmail.com";
    this.to = user.email;
    this.firstName = user.name;
    this.otp = otp || null;
    this.from = `SSA Services <${process.env.EMAIL_FROM}>`;
    sgMail.setApiKey(
      process.env.SENDGRID_API_KEY
    );
  }

  

  newTransport() {
   
    return nodemailer.createTransport({
      service:'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Send the actual email
   send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      otp: this.otp,
      subject
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      // text: htmlToText.fromString(html)
    };

    this.newTransport().sendMail(mailOptions, function(err, result){
      if (err) {
        console.error(err);
      }
      else
      {
        console.log("Email sent");
      }
    })
    // 3) Create a transport and send email
 
  }

   sendWelcome() {
     this.send('welcome', 'Welcome to SSA Logistics!!');
  }
  sendChangedPasswordNotification() {
    this.send('passwordChanged', 'Did you reset your password?');
 }
//   sendsellerVerification() {
//     this.send('sellerVerification', 'Verification Link For Seller');
//  }

   sendPasswordReset() {
     this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
};

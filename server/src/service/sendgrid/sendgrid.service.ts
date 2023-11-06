const sgMail = require("@sendgrid/mail");
require("dotenv").config();

class SendGridService {
  async sendForgotPasswordEmail(object: { emailTo: string; token: string }) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: `${object.emailTo}`, // Change to your recipient
      from: "lavinialavi352@gmail.com", // Change to your verified sender
      subject: "Forgot Password",
      text: "Don't panic, use the link to reset your password.",
      html: `<div>
      <strong>To change the password please follow the link</strong>
      </br>
      <p>${process.env.URL_CLIENT_APP}?token=${object.token}</p>
      </div>`,
    };

    await sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error("Intra in error");
        console.error(error);
        console.error(error.body);
      });

    return true;
  }

  async sendWelcomeEmail(object: { emailTo: string }) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: `${object.emailTo}`,
      from: "lavinialavi352@gmail.com",
      subject: "Welcome",
      text: "Welcome to password manager.",
      html: `<strong>BE SAVE.BE BRAVE</strong>`,
    };

    try {
      await sgMail.send(msg);
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendAuth2Email(object: { emailTo: string; auth2token: string }) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: `${object.emailTo}`,
      from: "lavinialavi352@gmail.com",
      subject: "Token login password manager",
      text: "Token Two Factor Authentification",
      html: `<strong>Use this token for authentification - ${object.auth2token} </strong>`,
    };

    try {
      await sgMail.send(msg);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new SendGridService();

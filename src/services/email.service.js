const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "3cac2807d36ee0",
        pass: "588b780595dfc0"
    }
});



const sendEmail = async (to, subject, text) => {
    const msg = { from:"admin@coiffer.com", to, subject, text };
    return await transport.sendMail(msg);
};
// SMTP_HOST = smtp.mailtrap.io
// SMTP_PORT = 2525
// SMTP_USERNAME = bd950e6abaab1e
// SMTP_PASSWORD = 4ce877aba1e3a8
// EMAIL_FROM = admin@gmail.com

// smtp: {
//     host: envVars.SMTP_HOST,
//         port: envVars.SMTP_PORT,
//             auth: {
//         user: envVars.SMTP_USERNAME,
//             pass: envVars.SMTP_PASSWORD,
//       },
// },

const sendWelcomeMail = async (user) => {
    const subject = 'Welcome to coiffer';
    const text = `
   Hi ${user.first_name} ${user.last_name},
    
    We are happy to see you at URLane! ${user.auth_code} is your verification code.

  Team URLane.`
    await sendEmail(user.email, subject, text);
};

module.exports = {
    sendEmail,
    sendWelcomeMail
};
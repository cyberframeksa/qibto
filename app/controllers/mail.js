const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const uuidv4 = require('uuid/v4');

module.exports = {
    sendEmail:sendEmail
}

function sendEmail(to, subject, html){

    return new Promise((resolve, reject) => {

        nodemailer.createTestAccount((err, account) => {

            var transporter = nodemailer.createTransport(smtpTransport({
                host: 'server.cyberframe.in',
                port:465,
                auth: {
                    user: 'suyash@node.cyberframe.in',
                    pass: 'SuyashGupta'
                }
                }));

            const token = uuidv4();

            let mailOptions = {
                from: '"Admin " <suyash@node.cyberframe.in>',
                to: to,
                subject: subject,
                html: html 
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(false);
                }
                else{
                    resolve(true);
                }
            });
        });

    });
}

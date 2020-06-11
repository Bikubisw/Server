const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "bikrambiswas043@gmail.com",
        pass: "22101997@biku"
    }
})
let renderTemplate = (data, relativepath) => {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativepath),
        data,
        function(err, template) {
            if (err) {
                console.log('Error in rendering template');
                return;
            }
            mailHtml = template;
        }
    )
    return mailHtml;
}
module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
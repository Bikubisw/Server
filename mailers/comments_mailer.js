const nodemailer = require('../config/nodemailer');
// this is another way of exporting method
exports.newcomment = (comment) => {
    let htmlString = nodemailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs')
    nodemailer.transporter.sendMail({
        from: 'Codial.com',
        to: comment.user.email,
        subject: 'New Comment published',
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log("Error in publishing mail", err);
            return;

        }
        console.log("Message Sent", info);
        return;
    });
}
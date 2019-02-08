const nodemailer = require("nodemailer");

module.exports = (question) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.GOOGLE_ADDRESS, // generated ethereal user
            pass: process.env.GOOGLE_ACCESS // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <angelh2m@gmail.com>', // sender address
        to: "angelh2m@gmail.com", // list of receivers
        subject: "New question ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>New question: </b> ` // html body
    };

    // send mail with defined transport object
    return transporter.sendMail(mailOptions)
}
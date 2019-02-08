
const express = require('express');
const router = express.Router();
// const { PostComment } = require('../models/PostComment.model');
const { Question } = require('../models/questions');

// const { BlogUser } = require('../models/questions');
const moment = require('moment');

// ENDPOINT: http://localhost:4000/comments/all-comments
// params: location 
// const BlogPost = require('../models/blog-post-model');

const nodemailer = require("nodemailer");

const { KEYS } = require('../Keys');


router.post('/', (req, res) => {
    console.log(req.body.location);

    let question = {
        email: req.body.email,
        name: req.body.name,
        question: req.body.question,
    }


    Question
        .create(question)
        .then(freshUser => {

            // async..await is not allowed in global scope, must use a wrapper
            async function main() {
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        user: KEYS.googleEmailAccount, // generated ethereal user
                        pass: KEYS.googlePasswordAccount // generated ethereal password
                    }
                });

                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"Fred Foo 👻" <angelh2m@gmail.com>', // sender address
                    to: "angelh2m@gmail.com", // list of receivers
                    subject: "New question ✔", // Subject line
                    text: "Hello world?", // plain text body
                    html: `<b>New question: </b> ${req.body.question}` // html body
                };

                // send mail with defined transport object
                let info = await transporter.sendMail(mailOptions)

                return res.json({
                    status: "New user Registered",
                    registered: true,
                    freshUser
                })


            }

            main().catch(console.error);

        })
        .catch((err) => { res.status(404).json({ ok: false, err }) });

    // res.json({
    //     ok: true,
    //     test: "PARAMS",
    //     location: req.body.location
    // })
})





module.exports = router;
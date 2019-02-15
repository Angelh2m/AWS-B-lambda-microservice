
const express = require('express');
const router = express.Router();
const { Question } = require('../models/Questions');
const mailer = require('../util/mailer');
const cors = require("cors");

router.all('*', cors({
    origin: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
}))


/* *
*  FOR ALL GENERAL QUERIES
*/

router.post('/question', async (req, res) => {

    let question = new Question({
        email: req.body.email,
        name: req.body.name,
        question: req.body.question,
    });

    question.save()
        .then(async (freshQuestion) => {
            // let result = await mailer(qaSupport);
            res.json({
                ok: true,
                freshQuestion,
                // result
            })
        }).catch(err => res.json({ ok: false }))
})






module.exports = router;
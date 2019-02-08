
const express = require('express');
const router = express.Router();
const { QaSupport } = require('../models/qaSupport');
const mailer = require('../util/mailer');

/* *
*  FOR ALL GENERAL QUERIES
*/

router.post('/question', async (req, res) => {

    let qaSupport = new QaSupport({
        email: req.body.email,
        name: req.body.name,
        question: req.body.question,
    });

    qaSupport.save()
        .then(async (freshQuestion) => {
            const result = await mailer(qaSupport);
            res.status(200).json({
                ok: true,
                freshQuestion,
                result
            })
        })
})






module.exports = router;

const express = require('express');
const router = express.Router();
const { Consultation } = require('../models/Consultations');
const { User } = require('../models/User');
const moment = require('moment');
const mailer = require('../util/mailer');


/* *
*  ONLY FOR PROTEDTED USERS AND REGISTERED
*/
router.post('/', async (req, res) => {

    console.warn(req.body.email, req.body.ref);

    let consultation = new Consultation({
        email: req.body.email,
        name: req.body.name,
        question: req.body.question,
        ref: req.body.ref
    });

    const consultationMade = await consultation.save(consultation)
        .then(async (succ) => {
            // const result = await mailer("angelh2m@gmail.com");
            return succ
        });

    const updateUser = await User.findOneAndUpdate(
        //*** FIND USER
        { id: req.body.reference },
        //*** ADD QUESTION ID
        { $push: { consultations: { "_id": consultationMade.id } } },
    ).then(user => user);

    res.status(200).json({
        ok: true,
        consultationMade,
        updateUser
    });
});



module.exports = router;
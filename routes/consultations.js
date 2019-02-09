
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
        title: req.body.title,
        question: req.body.question,
        desiredDoctor: req.body.desiredDoctor,
        userRef: req.body.ref
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

/* *
*  UPDATE THE CONSULTATION DATA
*/


router.put('/', async (req, res) => {

    let comment = { message: req.body.message, userRef: req.body.userRef };

    const consultationMade = await Consultation.findOne({ _id: req.body.questionID })
        .then(succ => succ)
        .catch(err => res.status(400).json({ ok: false, message: "Error question ID is incorrect" }))

    console.warn(consultationMade);

    // TYPE USER_REPLY / DOCTOR_RESPONSE / DOCTOR_REPLY
    if (req.body.type === "DOCTOR_RESPONSE") {
        consultationMade.resolved = false;
        consultationMade.response = comment
    }

    if (req.body.type === "USER_REPLY") {
        consultationMade.resolved = true;
        consultationMade.reply.push(comment)
    }

    if (req.body.type === "DOCTOR_REPLY") {
        consultationMade.resolved = false;
        consultationMade.reply.push(comment)
    }

    consultationMade.save().then((response) => {
        res.json({
            response
        })
    });

});


/* *
*  LOAD ALL QUESTION DATA
*/

router.get('/:id', async (req, res) => {

    const consultationMade = await Consultation.findOne({ _id: req.params.id })
        .populate('response.userRef', "account.name account.avatar")
        .populate('reply.userRef', "account.name account.avatar")
        .then(succ => succ)
        .catch(err => res.status(400).json({ ok: false, message: "Error fetching your question" }))

    consultationMade.save().then((response) => {
        res.json({
            response
        })
    });

});


/* *
*  GET ALL QUESTIONS BASED ON THE USER ID
*/


router.get('/all/:id', async (req, res) => {

    const consultationMade = await Consultation.find({ userRef: req.params.id })
        // .populate("userRef")
        .select("title  question created resolved email")
        .then(succ => {
            res.json({
                ok: true,
                succ
            })
        })
        .catch(err => res.status(400).json({ ok: false, message: "Error fetching your question" }))
});



module.exports = router;

const express = require('express');
const router = express.Router();
const { Consultation } = require('../models/Consultations');
const { User } = require('../models/User');
const moment = require('moment');
const mailer = require('../util/mailer');
const passport = require('passport');

/* *
*  ONLY FOR PROTEDTED USERS AND REGISTERED
*/
router.post('/', passport.authenticate('jwt', { session: false }),
    async (req, res) => {

        // if (req.user.account.availableCredits.length == 0) {
        //     return res.status(400).json({
        //         ok: false,
        //         message: "You don't have any consultations paid"
        //     })
        // }

        let consultation = new Consultation({
            userRef: req.user.id,
            email: req.user.account.email,
            desiredDoctor: req.body.doctor,
            details: req.body.details,
            question: req.body.question,
        });



        const consultationMade = await consultation.save()
            .then(async (succ) => {
                // const result = await mailer("angelh2m@gmail.com");
                // console.warn(succ);
                return succ
            });

        console.warn(req.body, req.user.id);

        const updateUser = await User.findOneAndUpdate(
            //*** FIND USER
            { _id: req.user.id },
            {
                // Remove one paid consultation
                $pop: { 'account.availableCredits': -1 },
                //*** ADD QUESTION ID
                $push: { consultations: { "_id": consultationMade._id } },
            },
        ).then(user => user);

        console.warn("SUCCESS CONSULTATION", updateUser);

        res.status(200).json({
            ok: true,
            // consultationMade,
            user: updateUser
        });
    });

/* *
*  UPDATE THE CONSULTATION DATA
*/
router.put('/', passport.authenticate('jwt', { session: false }),
    async (req, res) => {

        let comment = { message: req.body.message, userRef: req.user.id };

        const consultationMade = await Consultation.findOne({ _id: req.body.questionID })
            .then(succ => succ)
            .catch(err => res.status(400).json({ ok: false, message: "Error question ID is incorrect" }))

        // console.warn(consultationMade);
        // return res.json({
        //     ok: true,
        //     comment
        // })

        // TYPE USER_REPLY / DOCTOR_RESPONSE / DOCTOR_REPLY
        if (req.body.type === "DOCTOR_RESPONSE") {
            consultationMade.resolved = false;
            consultationMade.response = comment
        }

        if (req.body.type === "USER_REPLY") {
            consultationMade.resolved = false;
            consultationMade.reply.push(comment)
        }

        if (req.body.type === "DOCTOR_REPLY") {
            consultationMade.resolved = true;
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
        .populate('reply.userRef', "account.name account.avatar account.date")
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
        .select("details  question created resolved email")
        .then(succ => {
            res.json({
                ok: true,
                succ
            })
        })
        .catch(err => res.status(400).json({ ok: false, message: "Error fetching your question" }))
});



module.exports = router;
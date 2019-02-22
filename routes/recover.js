
const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const mailer = require('../util/mailer');

router.post('/', async (req, res) => {

    const email = req.body.email ? req.body.email.toLowerCase().trim() : '';

    console.warn(email);

    User.findOne({ 'account.email': email })
        .then((user) => {

            if (!user) { return res.status(404).json({ email: 'User not found' }) }

            if (user.account.googleID || user.account.facebookID) { }

            const payload = { id: user.id, email: user.account.email };

            // Sign the token
            jwt.sign(payload, process.env.SECRET_JWT_KEY, { expiresIn: 1800, },
                async (err, token) => {
                    // TOKEN 1800 for the next 30 minutes
                    user.account.locked = true;
                    const updatedUser = await user.save()
                    const result = await mailer(token, payload.email, "RECOVER");

                    return res.json({
                        success: true,
                        updatedUser
                    })
                });

        }).catch(err => err)
});


router.put('/:token', async (req, res) => {

    const token = req.params.token;

    const decoded = await jwt.decode(token, process.env.SECRET_JWT_KEY);



    User.findOne({ 'account.email': decoded.email })
        .then(async (user) => {

            if (!user) { return res.status(404).json({ email: 'User not found' }) }


            if (!user.account.locked) {
                return res.json({ message: 'You have already reset your password' })
            }

            user.account.locked = false;
            const hash = await bcrypt.hash(req.body.password, 10)
            user.account.password = hash;

            const updatedUser = await user.save()
            // console.log(updatedUser)
            // const result = await mailer(token, payload.email, "RECOVER");

            return res.json({
                success: true,
                updatedUser
            })


        }).catch(err => err)
});


module.exports = router;
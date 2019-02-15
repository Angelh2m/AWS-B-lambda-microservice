
const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {


    let newUser = new User({
        account: {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            avatar: req.body.avatar,
            password: req.body.password,
            paymentID: req.body.paymentID,
            googleID: req.body.googleID,
            facebookID: req.body.facebookID,
        }
    });


    User.findOne({ 'account.email': newUser.account.email })
        .then(async (user) => {

            console.warn(user);


            // *** User already exist just provide token
            if (user) {
                const payload = { id: user.id, name: user.account.name, avatar: user.account.avatar };
                // *** Compare password
                JWT_sign(payload)
                // if (user.account.password == newUser.account.password) {
                //     JWT_sign(payload)
                // }
            }

            // *** Register as new user and provide token
            newUser.save()
                .then((user) => {
                    const payload = { id: user.id, name: user.account.name, avatar: user.account.avatar };
                    JWT_sign(payload)
                })
                .catch((err) => console.log(err));

        }).catch(err => res.json({ ok: false, err }))

    async function JWT_sign(payload) {
        const token = jwt.sign(payload, process.env.SECRET_JWT_KEY, { expiresIn: 21600 })
        return res.json({ success: true, token: `Bearer ${token}` })
    }

})


module.exports = router;
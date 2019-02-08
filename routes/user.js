
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const { User } = require('../models/User');
const bcrypt = require('bcryptjs');

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

            if (user) { return res.status(400).json({ ok: false, message: 'Email already exists' }) }
            // *** Get the gravatar // Size | Rating | Default
            const avatar = gravatar.url(newUser.account.email, { s: '200', r: 'pg', d: 'mm' });

            // *** If there is no avatar 
            if (!newUser.account.avatar) { newUser.account.avatar = avatar }

            const hash = await bcrypt.hash(req.body.password, 10)
            newUser.account.password = hash;

            newUser.save()
                .then((user) => res.json(user))
                .catch((err) => console.log(err));

        }).catch(err => { console.log("********************* ERROR!!", err); })
})



router.put('/', async (req, res) => {

    const updatedUser = await User.findOne({ _id: req.body.id });

    updatedUser.account.name = req.body.name ? req.body.name : updatedUser.account.name;
    updatedUser.account.email = req.body.email ? req.body.email : updatedUser.account.email;
    updatedUser.account.name = req.body.name ? req.body.name : updatedUser.account.name;
    updatedUser.account.avatar = req.body.avatar ? req.body.avatar : updatedUser.account.avatar;

    if (req.body.password) {
        const hash = await bcrypt.hash(req.body.password, 10)
        updatedUser.account.password = hash
    }


    updatedUser.save().then(resp => {
        res.json({
            ok: true,
            resp
        })
    })

})




module.exports = router;
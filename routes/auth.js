
const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');


router.post('/', (req, res) => {

    const password = req.body.password;
    const email = req.body.email ? req.body.email.toLowerCase().trim() : '';

    User.findOne({ 'account.email': email })
        .then((user) => {

            if (!user) {
                return res.status(404).json({
                    email: 'User not found'
                });
            }

            // Check if the password is correct
            bcrypt.compare(password, user.account.password)
                .then((isMatch) => {

                    if (isMatch) {

                        // User match
                        const payload = {
                            id: user.id,
                            name: user.account.name,
                            avatar: user.account.avatar
                        }; // Create jwt payload



                        // Sign the token
                        jwt.sign(payload, process.env.SECRET_JWT_KEY, {
                            expiresIn: 21600,
                        }, (err, token) => {
                            return res.json({
                                success: true,
                                token: `Bearer ${token}`
                            })
                        });
                    }

                    if (!isMatch) {
                        return res.status(400).json({
                            password: 'Incorrect password'
                        });
                    }

                }).catch(err => err)
        }).catch(err => err)
})

// *** TEST ENDPI+OINT TO TEST LOGIN
router.post('/profile', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            user: req.user
        })
    }
);


module.exports = router;
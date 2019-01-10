
const express = require('express');
const router = express.Router();

const BlogUsers = require('../models/BlogUsers.model');

// const config = require('../config');
// const passport = require('passport');
// const jwtAuth = passport.authenticate('jwt', { session: false });


//this creates the auth token with a digital signature
// const createAuthToken = function (user) {
//     return jwt.sign({ user }, config.JWT_SECRET, {
//         subject: JSON.stringify(user),
//         expiresIn: "7d",
//         algorithm: 'HS256'
//     });
// }


router.post('/', async (req, res) => {

    let user = {
        socialID: req.body.socialID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: req.body.avatar,
    }

    if (!user.email) {
        return res.json({ message: "THERE IS NO EMAIL", ok: false })
    }

    let userID = "";

    // *** Find by user by its social media ID

    await BlogUsers
        .find({ socialID: user.socialID })
        .then(user => { userID = user ? user[0].id : null })
        .catch(() => { console.log('Not found') });

    // *** If user does not exist register as new user

    if (userID) {
        return res.json({
            status: "User already registered",
            registered: true,
            // token: createAuthToken(user)
        })
    }

    if (!userID) {
        console.log("CREATE USER");
        await BlogUsers
            .create(user)
            .then(freshUser => {
                return res.json({
                    status: "New user Registered",
                    registered: true,
                    token: createAuthToken(user)
                })
            })
            .catch(() => { console.log('ERROR WHEN CREATING') });
    }

})

// router.post('/login', jwtAuth, (req, res) => {

//     res.json({
//         ok: true,
//         kk: req.user
//     })
// })

module.exports = router;
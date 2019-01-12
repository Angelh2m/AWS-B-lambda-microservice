
const express = require('express');
const router = express.Router();
const cors = require("cors");
const { BlogUser } = require('../models/blogUsers');

var issue2options = {
    origin: true,
    methods: ['POST'],
    credentials: true,
    maxAge: 3600
};

router.options('/', cors(issue2options));

router.post('/', cors(issue2options), (req, res) => {

    let user = {
        socialID: req.body.socialID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: req.body.avatar,
    }

    if (!user.email) {
        return res.json({ message: "THERE IS NO EMAIL", ok: false, user })
    }

    // *** Find by user by its social media ID
    BlogUser
        .findOne({ socialID: user.socialID })
        .then(resp => {
            console.log(resp);

            // *** If user does not exist register as new user
            if (resp) {
                return res.json({
                    status: "User already registered",
                    registered: true,
                })
            }

            BlogUser
                .create(user)
                .then(freshUser => {
                    return res.json({
                        status: "New user Registered",
                        registered: true,
                        freshUser
                    })
                })

                .catch((err) => { res.status(404).json({ ok: false, err }) });

        }).catch((err) => { res.status(404).json({ ok: false, message: "On finding", err }) });
})


module.exports = router;

const express = require('express');
const router = express.Router();
const PostComment = require('../models/PostComment.model');
const { BlogUser } = require('../models/blogUsers');
const moment = require('moment');

// ENDPOINT: http://localhost:4000/comments/all-comments
// params: location 
// const BlogPost = require('../models/blog-post-model');

router.post('/all', async (req, res) => {
    console.log(req.body.location);
    PostComment
        .find({ post: req.body.location })
        .then(post => {
            if (post) {
                res.status.json({
                    post,
                    loc: req.body.location
                })
            }
        }).catch(() => { console.log('Error when trying to filter dates') });
})


router.post('/', async (req, res) => {

    let user = {
        name: req.body.name,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar,
        socialID: req.body.socialID,
        exp: req.body.exp,
        location: req.body.location,
        comment: req.body.comment
    }

    // *** Find by user by its social media ID
    return BlogUser
        .find({ socialID: user.socialID })
        .then(resp => {


            if (!resp[0].socialID) {
                res.status(400).json({ message: 'User not registered' })
            }

            // *** Post comment and user ID
            PostComment
                .find({ post: user.location })
                .then(post => {

                    if (!post[0]) {
                        res.status(400).json({ message: 'No post based on location' })
                    }

                    let stopAttack;
                    // Find post comment from the user if already commented
                    post[0].comments.filter(comment => {

                        if (user.socialID == comment.socialID) {

                            let currentDate = moment().format('LLLL');
                            // TODO SET 0 - 5 minutes
                            let TwentyminutesLates = moment(comment.date).add(5, 'minutes').format('LLLL');
                            // console.log("•••••••••••••••••••••••••••••••••••", TwentyminutesLates, currentDate);
                            if (TwentyminutesLates > currentDate) { return stopAttack = true }
                        }
                    })

                    if (stopAttack) {
                        return res.status(403).json({ ok: false, message: "Attack stopped!" })
                    }

                    // return
                    let postComment = {
                        socialID: user.socialID,
                        name: user.name,
                        comment: user.comment,
                        avatar: user.avatar,
                    }

                    // return
                    PostComment
                        .findOneAndUpdate({ post: user.location }, { "$push": { "comments": postComment } })
                        .then(updatedPost => {
                            return res.status(200).json({ ok: true, updatedPost });
                        })

                        .catch(err => { res.status(500).json({ message: 'There is an error with updating your post.' }) });

                }).catch(() => { console.log('Error when trying to filter dates') });

        }).catch(() => { console.log('Not found') });
})



module.exports = router;
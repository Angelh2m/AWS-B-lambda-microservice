
const express = require('express');
const router = express.Router();
const { PostComment } = require('../models/PostComment.model');
const { BlogUser } = require('../models/blogUsers');
const moment = require('moment');

// ENDPOINT: http://localhost:4000/comments/all-comments
// params: location 
// const BlogPost = require('../models/blog-post-model');

router.post('/', (req, res) => {
    console.log(req.body.location);
    res.json({
        ok: true,
        test: "PARAMS",
        location: req.body.location
    })
})





module.exports = router;
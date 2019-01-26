const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const PostComments = new Schema({
    post: {
        type: String,
        required: true
    },
    comments: [
        {
            socialID: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            comment: {
                type: String,
                required: true
            },
            avatar: {
                type: String,
                required: true
            }
        }
    ]
});


module.exports = {
    PostComment: mongoose.model('PostComments', PostComments)
}
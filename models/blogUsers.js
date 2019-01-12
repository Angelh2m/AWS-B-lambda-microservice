const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const BlogUser = new Schema({
    socialID: { type: String, unique: true },
    firstName: String,
    lastName: String,
    email: String,
    avatar: String,
});


module.exports = {
    BlogUser: mongoose.model('blogUsers', BlogUser)
}
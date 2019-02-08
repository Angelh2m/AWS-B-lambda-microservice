const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dcUsers = require('./user')

//schema
const Questions = new Schema({
    email: { type: String },
    name: String,
    question: String,
    stories: [{ type: Schema.Types.ObjectId, ref: 'dcUsers' }]
});


module.exports = {
    Question: mongoose.model('DoctorQuestions', Questions)
}
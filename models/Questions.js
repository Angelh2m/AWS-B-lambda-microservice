const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Questions = new Schema({
    date: { type: Date, default: Date.now },
    email: { type: String },
    name: String,
    question: String,
});


module.exports = {
    Question: mongoose.model('Doctor_questions', Questions)
}
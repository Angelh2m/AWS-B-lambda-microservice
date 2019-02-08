const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const dcUsers = require('./user')

//schema
const QaSupport = new Schema({
    email: { type: String },
    userSince: { type: Date, default: Date.now },
    name: String,
    question: String,
});


module.exports = {
    QaSupport: mongoose.model('QaSupport', QaSupport)
}
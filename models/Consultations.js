const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const dcUsers = require('./user')

//schema
const Consultations = new Schema({
    created: { type: Date, default: Date.now },
    lastUpdate: { type: Date, default: Date.now },
    resolved: { type: Boolean, default: false },

    ref: { type: Schema.Types.ObjectId, ref: 'Doctor_users', required: true },
    email: { type: String },
    name: String,
    question: String,
    reply: [
        {
            reference: [{ type: Schema.Types.ObjectId, ref: 'Doctor_users' }],
            message: { type: String },
            date: { type: Date, default: Date.now },
        }
    ]
});


module.exports = {
    Consultation: mongoose.model('Doctor_consultations', Consultations)
}
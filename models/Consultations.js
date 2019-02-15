const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const dcUsers = require('./user')

//schema
const Consultations = new Schema({
    created: { type: Date, default: Date.now },
    lastUpdate: { type: Date, default: Date.now },
    resolved: { type: Boolean, default: false },
    // *** Get the ID of the USER who opened the ticket
    userRef: { type: Schema.Types.ObjectId, ref: 'Doctor_users' },

    email: { type: String },
    details: String,
    question: String,
    desiredDoctor: String,
    response: {// *** Get the ID of the DOCTOR who responded the ticket
        date: { type: Date, default: Date.now },
        message: String,
        userRef: { type: Schema.Types.ObjectId, ref: 'Doctor_users' }
    },
    files: [{ bucketID: String }],
    reply: [
        {   // *** Get the ID of the USER/DOCTOR who commented
            date: { type: Date, default: Date.now },
            message: { type: String },
            userRef: { type: Schema.Types.ObjectId, ref: 'Doctor_users' },
        }
    ]
});


module.exports = {
    Consultation: mongoose.model('Doctor_consultations', Consultations)
}
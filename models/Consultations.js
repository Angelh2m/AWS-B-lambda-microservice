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
    title: String,
    question: String,
    desiredDoctor: String,
    response: {
        date: { type: Date, default: Date.now },
        message: String,
        // *** Get the ID of the DOCTOR who responded the ticket
        userRef: { type: Schema.Types.ObjectId, ref: 'Doctor_users' }
    },
    files: [{ bucketID: String }],
    reply: [
        {   // *** Get the ID of the USER/DOCTOR who commented
            userRef: [{ type: Schema.Types.ObjectId, ref: 'Doctor_users' }],
            message: { type: String },
            date: { type: Date, default: Date.now },
        }
    ]
});


module.exports = {
    Consultation: mongoose.model('Doctor_consultations', Consultations)
}
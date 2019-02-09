const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const User = new Schema({
    account: {
        name: String,
        lastName: String,
        email: { type: String, required: true, unique: true },
        avatar: String,
        password: String,
        paymentID: String,
        userSince: { type: Date, default: Date.now },
        locked: { type: String, default: false },
        googleID: String,
        facebookID: String,
    },
    payments: [{
        date: { type: Date, default: Date.now },
        brand: String,
        last4: String,
        name: String,
        customer: String,
        ammount: String,
        status: String,
    }],
    consultations: [{ type: Schema.Types.ObjectId, ref: 'Doctor_consultations' }]

});


module.exports = {
    User: mongoose.model('Doctor_users', User)
}
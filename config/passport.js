const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const { User } = require('../models/user');

// Compare if the token is valid
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_JWT_KEY;

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ "_id": jwt_payload.id }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            //*** Override password 
            user.account.password = ":)"
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = (passport) => passport
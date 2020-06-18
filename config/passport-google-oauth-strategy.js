const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');
//Tell passport to add new strategy for google login
passport.use(new GoogleStrategy({
    clientID: env.google_client_ID,
    clientSecret: env.google_client_Secret,
    callbackURL: env.google_callbackURL
}, function(accessToken, refreshToken, profile, done) {
    User.findOne({ email: profile.emails[0].value }).exec(function(err, user) {
        if (err) {
            console.log("Error in google Starategy", err);
            return;
        }
        console.log(profile);
        if (user) {
            return done(null, user);
        } else {
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, user) {
                if (err) {
                    console.log("Error in creating Starategy", err);
                    return;
                }
                return done(null, user);

            });
        }
    });
}));
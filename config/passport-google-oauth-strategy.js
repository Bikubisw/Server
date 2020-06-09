const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
//Tell passport to add new strategy for google login
passport.use(new GoogleStrategy({
    clientID: "886866967364-0ku4fo0l2o221sn28o8bh2lmgue7pcco.apps.googleusercontent.com",
    clientSecret: "iIfOQP7Zig00j9L_BHJrVRI_",
    callbackURL: "https://localhost:8000/users/auth/google/callback"
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

            })
        }
    })
}))
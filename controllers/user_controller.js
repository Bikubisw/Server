const User = require('../models/user');
module.exports.profile = (req, res) => {
    return res.render('User_profile', { title: "Profile" });
}
module.exports.signin = (req, res) => {
    return res.render('user_sign_in', { title: "Codial|Sign In" });
}
module.exports.signup = (req, res) => {
    return res.render('user_sign_up', { title: "Codial|Sign up" });
}
module.exports.create = (req, res) => {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log("Error in signing uP");
            return;
        }
        if (!user) {
            User.create(req.body, (err, user) => {
                if (err) {
                    console.log("Error in creating user to Sign up");
                }
                return res.redirect('/users/signin');
            });
        } else {
            return res.redirect('back');
        }
    });
}
module.exports.createSession = (req, res) => {
    //TODO Late
}
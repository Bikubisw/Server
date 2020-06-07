const User = require('../models/user');
const fs = require('fs');
const path = require('path');
module.exports.profile = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        return res.render('User_profile', {
            title: "Profile",
            profile_user: user

        });

    });
}
module.exports.update = async function(req, res) {
    // if (req.user.id == req.params.id) {
    //     User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    //         return res.redirect('back');
    //     });

    // } else {
    //     return res.status(401).send('Unauthorized');
    // }
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err) {
                if (err) {
                    console.log("Error", err);
                    return;
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {
                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, "..", user.avatar));
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        } catch (err) {
            req.flash("error", "There is Some Error");
            return res.redirect('back');
        }
    } else {
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized');

    }
}
module.exports.signin = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', { title: "Codial|Sign In" });
}
module.exports.signup = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
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
    req.flash("success", 'Logged in Successfully');
    return res.redirect('/');
}
module.exports.destroySession = (req, res) => {
    req.logout();
    req.flash("success", 'Logged out Successfully');

    return res.redirect('/');
}
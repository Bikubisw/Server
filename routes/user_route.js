const express = require("express");
const router = express.Router();
const passport = require('passport');
const userController = require("../controllers/user_controller");
router.get('/profile', passport.checkAuthentication, userController.profile);
router.get('/signin', userController.signin);
router.get('/signup', userController.signup);
router.post('/create', userController.create);
router.post('/create-session', passport.authenticate(
        'local', { failureRedirect: '/users/signin' },
    ),
    //
    userController.createSession
);
router.get('/signout', userController.destroySession);
//router.get('/signout', userController.signout);
module.exports = router;
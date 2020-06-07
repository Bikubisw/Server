const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");
router.get('/', homeController.home);
router.use('/users', require("./user_route"));
router.use('/posts', require('./post_route'));
router.use('/comments', require('./comment_route'));
router.use('/api', require('./api'));

//router.use('/profile', require('./profile_route'));
module.exports = router;
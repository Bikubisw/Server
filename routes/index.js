const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");
router.get('/', homeController.home);
router.use('/users', require("./user_route"));
router.use('/posts', require('./post_route'));
//router.use('/profile', require('./profile_route'));
module.exports = router;
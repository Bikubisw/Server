const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
module.exports.createSession = async function(req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user || user.password != req.body.password) {
            return res.json(422, {
                message: "Invalid Username or password"
            })
        }
        return res.json(200, {
            message: "User is found plaease take your coupon and safe",
            data: {
                token: jwt.sign(user.toJSON(), 'codial', { expiresIn: '100000' })
            }
        })

    } catch (err) {
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}
const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req, res) {
        try {

        } catch (err) {
            console.log(("err");
                return res.json(500, {
                    message: "Internal Server Error"
                })
            }
        }
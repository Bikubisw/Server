const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req, res) {
    try {
        let likeable;
        let deleted = false;
        if (req.query.type == 'Post') {
            likeable = await Post.findById(req.query.id).populate('likes');
        } else {
            likeable = await Comment.findById(req.query.id).populate('likes')
        }

        // check if a like already exists
        let existsLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })
        if (existsLike) {
            likeable.likes.pull(existsLike._id);
            likeable.save();
            existsLike.remove();
            deleted = true;

        } else {
            let newlike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            })
            likeable.likes.push(newlike._id);
            likeable.save();
        }
        return res.json(200, {
            message: "Request Successfull",
            data: {
                deleted: deleted
            }

        })

    } catch (err) {
        console.log("err");
        return res.json(500, {
            message: "Internal Server Error"
        })
    }
}
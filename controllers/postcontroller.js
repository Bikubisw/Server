const Post = require('../models/post');
const Comment = require("../models/comment");
const Like = require('../models/like');
module.exports.create = async function(req, res) {
    try {

        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if (req.xhr) {
            post = await post.populate('user', 'name').execPopulate();
            return res.status(200).json({
                data: {
                    post: post,
                },
                message: "post Created"
            });
        }
        req.flash("success", "Post is Created");
        return res.redirect('back');
    } catch (err) {
        req.flash("error", "There is Some Error to Create the post");
        return res.redirect('back');
    }

}
module.exports.destroy = async function(req, res) {
    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {
            await Like.deleteMany({ likeable: post, onModel: 'Post' });
            await Like.deleteMany({ _id: { $in: post.comment } });
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id,
                    },
                    message: "post deleted!"
                });
            }

            req.flash("success", "Post and associated comments are Deleted");

            return res.redirect('back');


        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log("Error", err);
        return;
    }


}
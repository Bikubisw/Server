const Comment = require('../models/comment');

const Post = require('../models/post');
module.exports.create = (req, res) => {
    Post.findById(req.body.post, (err, post) => {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id

            }, (err, comment) => {
                if (err) {
                    console.log("Error coming to solve it");
                    return;
                }
                post.comment.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    });
}
module.exports.destroy = (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            console.log("There is an Error");
            return;
        }
        if (comment.user == req.user.id) {
            let postid = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postid, { $pull: { comment: req.params.id } }, function(err, post) {
                return res.redirect('back');
            });

        } else {
            return res.redirect('back');
        }

    })
}
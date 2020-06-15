const Comment = require('../models/comment');
const Post = require('../models/post');
const commentMailer = require('../mailers/comments_mailer');
const commentEmailworker = require('../workers/comt_email_worker');
const queue = require('../config/kue');
const Like = require('../models/like');
module.exports.create = async function(req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id

            });
            post.comment.push(comment);
            post.save();
            comment = await comment.populate('user', 'name email').execPopulate();
            //commentMailer.newcomment(comment)
            let job = queue.create('emails', comment).save(function(err) {
                if (err) {
                    console.log("Erroe in queue", err);
                    return;
                }
                console.log('Job Enqueued', job.id);
            })
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment: comment,
                    },
                    message: "comment Created"
                });
            }
            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    } catch (err) {
        req.flash('error', err);
        return;
    }

}
module.exports.destroy = async function(req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postid = comment.post;
            comment.remove();
            let post = Post.findByIdAndUpdate(postid, { $pull: { comment: req.params.id } });
            await Like.deleteMany({ likeable: comment, onModel: 'Comment' });
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "comment deleted"
                });
            }
            req.flash('success', 'Comment deleted!');

            return res.redirect('back');


        } else {
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }

    } catch (err) {
        console.log("Error", err);
        return;
    }

}
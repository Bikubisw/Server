 const Post = require('../models/post');
 const User = require('../models/user');
 module.exports.home = async function(req, res) {
     // console.log(req.cookies);
     // return res.render('home', { title: "home" });
     //  Post.find({}, function(err, posts) {
     //      return res.render('home', {
     //          title: 'Codial|Home',
     //          posts: posts
     //      });
     //  });
     try {
         let posts = await Post.find({})
             .populate('user')
             .sort('-createdAt')
             .populate({
                 path: 'comment',
                 populate: {
                     path: 'user'
                 }
             });
         let users = await User.find({});
         return res.render('home', {
             title: 'Codial|Home',
             posts: posts,
             all_users: users
         });

     } catch (err) {
         console.log("Error", err);
         return;
     }


 }
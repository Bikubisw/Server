 const Post = require('../models/post');
 module.exports.home = function(req, res) {
     // console.log(req.cookies);
     // return res.render('home', { title: "home" });
     //  Post.find({}, function(err, posts) {
     //      return res.render('home', {
     //          title: 'Codial|Home',
     //          posts: posts
     //      });
     //  });
     Post.find({}).populate('user').exec(function(err, posts) {
         return res.render('home', {
             title: 'Codial|Home',
             posts: posts
         });
     });

 }
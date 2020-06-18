 const Post = require('../models/post');
 const User = require('../models/user');
 const Chat = require('../models/chat');
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
             .sort('-createdAt')
             .populate('user')
             .populate({
                 path: 'comment',
                 populate: {
                     path: 'user'
                 }
                 //  populate: {
                 //      path: 'likes'
                 //  }
             }).populate('likes');
         let chats = await Chat.find({});


         let users = await User.find({});
         return res.render('home', {
             title: 'Codial|Home',
             posts: posts,
             all_users: users,
             chats: chats
         });

     } catch (err) {
         console.log("Error", err);
         return;
     }


 }
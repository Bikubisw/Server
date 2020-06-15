const Chat = require('../models/chat');
module.exports.chatSockets = function(socketServer) {
    let io = require('socket.io')(socketServer);
    io.sockets.on('connection', function(socket) {
        console.log("new Connection received", socket.id);

        socket.on('disconnect', function() {
            console.log("Socket disconnected");
        });
        socket.on('join_room', function(data) {
            console.log("Joining options is received", data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined', data);
        })
        socket.on('send_message', function(data) {
            io.in(data.chatroom).emit('receive_message', data);
            let chatmessage = Chat.create({
                message: data.message,
                sender: data.user_email
            });

        })
    })
}
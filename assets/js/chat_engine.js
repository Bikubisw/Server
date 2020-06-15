class chatEngine {
    constructor(chatboxId, userEmail) {
        this.chatBox = $(`#${chatboxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://localhost:5000');
        if (this.userEmail) {
            this.connectionHandeler();
        }

    }
    connectionHandeler() {
        let self = this;
        this.socket.on('connect', function() {
            console.log("A socket connection is established");
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: "codial"
            })
            self.socket.on('user_joined', function(data) {
                console.log("A user joined", data);
            })
        })
        $('#send-message').click(function() {
            let msg = $('#chat-message-input').val();
            if (msg != '') {
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: "codial"
                });
            }
        });
        self.socket.on('receive_message', function(data) {

            console.log('message received', data.message);
            let newmessage = $('<li>');
            let messageType = 'other-message';
            if (data.user_email == self.userEmail) {
                messageType = 'self-message';

            }
            newmessage.append($('<span>', {
                'html': data.message,
            }));
            newmessage.append($('<sub>', {
                'html': data.user_email,
            }))
            newmessage.addClass(messageType);
            $('#chat-messages-list').append(newmessage);
            $('#chat-message-input').val("");

        })
    }
}
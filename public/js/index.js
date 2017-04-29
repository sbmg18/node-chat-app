var socket = io();

socket.on('connect', function () {
    console.log("Connected to server.");
});

socket.on('newMessage', function(message) {
    var li = $("<li></li>");
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

socket.on('disconnect', function () {
    console.log("Server disconnected.");
});

$('document').ready(function() {
    $('#message-form').on('submit', function(e) {
        e.preventDefault();
        socket.emit('createMessage', {
            from: 'User',
            text: $('#message').val()
        });
    });
});
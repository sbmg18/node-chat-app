var socket = io();

socket.on('connect', function () {
    console.log("Connected to server.");

    socket.emit('createMessage', {
        from: "Bob",
        text: "Hey I'm Bob!"
    });
});

socket.on('newMessage', function(message) {
    console.log("New message arrived", message);
});

socket.on('disconnect', function () {
    console.log("Server disconnected.");
});
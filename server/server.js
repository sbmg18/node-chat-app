const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    console.log("New user connected.");

    socket.emit('newMessage', {
        from: "Admin",
        text: "Test message",
        createdAt: 1244
    });

    socket.on('createMessage', (message) => {
        console.log("Create message request", message);
    });

    socket.on('disconnect', () => {
        console.log("Client disconnected.");
    });

});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

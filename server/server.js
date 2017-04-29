const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    console.log("New user connected.");

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app!'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joinned!'));

    socket.on('createMessage', (message) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on('disconnect', () => {
        console.log("Client disconnected.");
    });

});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

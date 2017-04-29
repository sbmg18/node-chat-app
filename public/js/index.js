var socket = io();

socket.on('connect', function () {
    console.log("Connected to server.");
});

socket.on('newMessage', function (message) {
    var li = $("<li></li>");
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    var li = $("<li></li>");
    var a = $("<a target='_blank'>My current location</a>");
    
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});

socket.on('disconnect', function () {
    console.log("Server disconnected.");
});

$('document').ready(function () {

    $('#message-form').on('submit', function (e) {
        e.preventDefault();
        socket.emit('createMessage', {
            from: 'User',
            text: $('#message').val()
        });
    });

    $('#send-geolocation').on('click', function (e) {
        e.preventDefault();

        if (!navigator.geolocation) {
            return alert("Geolocation is not supported by your browser.");
        }

        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            socket.emit("createGeolocationMessage", { latitude, longitude });

        }, function () {
            alert("Unable to fetch your location");
        });
    });

});
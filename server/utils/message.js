var generateMessage = (from, text) => {
    return {
        from, text,
        createdAt: new Date().getTime()
    };
};

var generateLocationMessage = (from, latitude, longitude) => {
    return {
        createdAt: new Date().getTime(),
        from,
        url: `http://www.google.com/maps?q=${latitude},${longitude}`
    };
};

module.exports = {generateMessage, generateLocationMessage};
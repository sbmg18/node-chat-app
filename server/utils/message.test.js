var expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = "Admin";
        var text = "Test message";
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text });
    });

    it('should generate correct location message object', () => {
        var from = "Admin";
        var latitude = 1;
        var longitude = 2;
        var message = generateLocationMessage(from, latitude, longitude);
        var url = `http://www.google.com/maps?q=${latitude},${longitude}`;

        expect(message).toInclude({ from, url });
        expect(message.createdAt).toBeA('number');
    });
});
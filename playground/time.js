const moment = require('moment');

var date = moment();

date.add(3, 'hour').add(19, 'm');

console.log(date.format('h:mm a'));
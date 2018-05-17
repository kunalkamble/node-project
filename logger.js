const EventEmitter = require('events');

var url = 'http://kunalkamble.com';

class Logger extends EventEmitter {
    log(message) {
        console.log(message);

        // emit means making noise or produce something
        //Raised an event
        this.emit('messageLogged', { 'id': 1, 'url': 'google.com' });
    }
}

module.exports = Logger;
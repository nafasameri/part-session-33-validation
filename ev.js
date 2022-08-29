const EventEmitter = require('events').EventEmitter;
const em = new EventEmitter();

em.on('hi', (a,b) => {
    console.log('Hello World!',a+b);
});

em.emit('hi',2,3);
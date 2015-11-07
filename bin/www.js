"use strict";

const app = require('../app');
const db = require('../mongoClient');
const http = require('http');
const fs = require('fs');
const agendaController = require('../controllers/agendaController');
const taskController = require('../controllers/taskController');

db.connect(process.env.MONGO_URL);

// Bootstrap mongoose models
fs.readdirSync(__dirname + '/../models').forEach(function (file) {
    require('../models/' + file);
});

const port = normalizePort(process.env.PORT || 3000);

app.set('port', port);

//create routes for agendas
agendaController(app);

//create routes for tasks
taskController(app);

const server = http.createServer(app);

server.listen(port);

server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}

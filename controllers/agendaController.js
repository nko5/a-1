var mongoose = require('mongoose');
var Coral = require('coral');
var authController = require('./authController');

module.exports = function (app) {

    var config = {
        path: '/api/agendas',
        model: mongoose.model('Agenda'),
        updateRef: {
            model: mongoose.model('User'),
            path: 'agendas',
            findOneId: authController.getCurrentUser
        },
        middlewares: [authController.ensureAuthenticated]
    };

    config.method = ['GET', 'POST', 'PUT', 'DELETE'];
    app.use(new Coral(config));

};

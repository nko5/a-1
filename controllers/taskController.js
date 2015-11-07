var mongoose = require('mongoose');
var Coral = require('coral');
var authController = require('./authController');

module.exports = function (app) {

    var config = {
        path: '/api/agendas/:agendaId/tasks',
        model: mongoose.model('Task'),
        updateRef: {
            model: mongoose.model('Agenda'),
            path: 'tasks',
            findOneId: function (req, res) {
                return req.params.agendaId;
            }
        },
        middlewares: [authController.ensureAuthenticated]
    };

    //config.method = ['GET', 'POST', 'PUT', 'DELETE'];
    app.use(new Coral(config));

};

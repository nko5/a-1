'use strict';

const mongoose = require('mongoose');
const Coral = require('coral');
const authController = require('./authController');

module.exports = function(app) {

  let config = {
    path: '/api/agendas',
    model: mongoose.model('Agenda'),
    updateRef: {
      model: mongoose.model('User'),
      path: 'agendas',
      findOneId: authController.getCurrentUser
    },
    query: {
      options: {
        populate: 'tasks'
      }
    },
    middlewares: [authController.ensureAuthenticated]
  };

  config.method = ['GET', 'POST', 'PUT', 'DELETE'];
  app.use(new Coral(config));

};

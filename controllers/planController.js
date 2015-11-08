"use strict";

var Agenda = require('../models/agenda');
var _ = require('lodash');
var locationController = require('./locationController');

function getStartingLocation(agendaDoc, currentTaskIndex) {
  if (currentTaskIndex === 0) {
    return agendaDoc.startAddress;
  } else {
    // find prior task
    return agendaDoc.tasks[currentTaskIndex - 1].location;
  }
}

module.exports.planDay = function(req, res) {
  Agenda.findOne({
      _id: req.params.agendaId
    })
    .populate('tasks')
    .exec(function(err, doc) {
      if (err) {
        return handleError(err)
      };

      var agendaDoc = doc.toObject();
      var promises = [];

      for(var i = 0; i < agendaDocs.tasks.length; i++) {
        var startLocation = getStartingLocation(agendaDoc, i);
        var currentTask = task[i];
        var endLocation = currentTask.location;

        promises.push(new Promise(function(resolve, reject) {
          locationController.getTravelTime(startLocation, endLocation, function(err, duration) {
            if (err) {
              return reject(err)
            };

            currentTask.travelDuration = duration.minutes;
            return resolve(task);
          });
        }));
      }

      Promise.all(promises).then(function(values) {
        agendaDoc.tasks = values;
        res.json(agendaDoc);
      });
    });
}

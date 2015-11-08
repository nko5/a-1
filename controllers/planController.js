"use strict";

var Agenda = require('../models/agenda');
var _ = require('lodash');
var locationController = require('./locationController');

function getStartingLocation(agendaDoc, currentTask) {
  if (currentTask.sequenceNumber === 0) {
    return agendaDoc.startAddress;
  } else {
    // find prior task
    var priorTask = _.find(agendaDoc.tasks, {
      sequenceNumber: currentTask.sequenceNumber - 1
    });
    return priorTask.location;
  }
}

module.exports.planDay = function(req, res) {
  Agenda.findOne({
      _id: req.params.agendaId
    })
    .populate('tasks')
    .exec(function(err, doc) {
      if (err) return handleError(err);

      var agendaDoc = doc.toObject();

      var promises = [];

      agendaDoc.tasks.forEach(function(task) {
        var startLocation = getStartingLocation(agendaDoc, task);
        var endLocation = task.location;

        promises.push(new Promise(function(resolve, reject) {
          locationController.getTravelTime(startLocation, endLocation, function(err, duration) {
            if (err) return reject(err);
            task.travelDuration = duration.minutes;
            return resolve(task);
          });
        }));
      });

      Promise.all(promises).then(function(values) {
        agendaDoc.tasks = values;
        res.json(agendaDoc);
      });
    });

  // agenda -> start time, location of my days
  // foreach Task
  // - get location, use previous task/agenda if first to calculate travel time
}

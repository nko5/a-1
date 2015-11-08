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

function getTravelDuration(startLocation, endLocation, currentTask) {
  return new Promise(function(resolve, reject) {
    locationController.getTravelTime(startLocation, endLocation, function(err, duration) {
      if (err) {
        return reject(err)
      };
      currentTask.travelDuration = duration.duration.minutes;
      return resolve(currentTask);
    });
  })
}

function getReturnTask(agendaDoc) {

  var lastTask = agendaDoc.tasks[agendaDoc.tasks.length - 1];

  var travelToEndTask = {
    description: "Travel to end address",
    duration: 0,
    location: agendaDoc.endAddress
  };

  return getTravelDuration(lastTask.location, travelToEndTask.location, travelToEndTask);
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

      if (!doc) {
        return res.status(404).json({result:"not found."})
      }

      var agendaDoc = doc.toObject();
      var promises = [];

      if (agendaDoc.tasks.length > 0) {
        for (var i = 0; i < agendaDoc.tasks.length; i++) {
          var startLocation = getStartingLocation(agendaDoc, i);
          var currentTask = agendaDoc.tasks[i];
          var endLocation = currentTask.location;

          promises.push(getTravelDuration(startLocation, endLocation, currentTask));
        }

        if (agendaDoc.endAddress !== "") {
          promises.push(getReturnTask(agendaDoc));
        }

        Promise.all(promises).then(function(values) {
          agendaDoc.tasks = values;
          return res.json(agendaDoc);
        });
      } else {
        return res.json(agendaDoc);
      }


    });
}

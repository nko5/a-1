"use strict";

var Agenda = require('../models/agenda');
var _ = require('lodash');

function getStartingLocation(agendaDoc) {
  agendaDoc.tasks.forEach(function(task) {
    if (task.sequenceNumber === 1) {
      return agendaDoc.startAddress;
    } else {
      // find prior task
      var priorTask = _.find(agendaDoc.tasks, {
        sequenceNumber: task.sequenceNumber - 1
      });
      return priorTask.location;
    }
  });
}

module.exports.planDay = function(req, res) {
  Agenda.findOne({
      _id: req.params.agendaId
    })
    .populate('tasks')
    .exec(function(err, doc) {
      if (err) return handleError(err);

      var agendaDoc = doc.toObject();

      var startLocation = getStartingLocation(agendaDoc);

      res.json(agendaDoc);
    });

  // agenda -> start time, location of my days
  // foreach Task
  // - get location, use previous task/agenda if first to calculate travel time
}

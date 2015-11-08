var Agenda = require('../models/agenda');

module.exports.planDay = function(req, res) {
  Agenda.findOne({
      _id: req.params.agendaId
    })
    .populate('tasks')
    .exec(function(err, agenda) {
      if (err) return handleError(err);

      var startTime = agenda.startTime;
      var endTime = agenda.endTime;
      res.json(agenda);
    });

  // agenda -> start time, location of my days
  // foreach Task
  // - get location, use previous task/agenda if first to calculate travel time
}

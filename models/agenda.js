"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agendaSchema = new Schema({
    description: {type: String, default: ''},
    date: {type: Date},
    startTime: {type: Date},
    endTime: {type: Date},
    startAddress: {type: String, default: ''},
    endAddress: {type: String, default: ''},
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
});

exports = module.exports = mongoose.model('Agenda', agendaSchema);

"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agendaSchema = new Schema({
    description: {type: String, default: ''},
    date: {type: Date},
    startTime: {type: Date},
    endTime: {type: Date},
    startAddress: {type: Schema.Types.ObjectId, ref: 'Address'},
    endAddress: {type: Schema.Types.ObjectId, ref: 'Address'},
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
});

exports = module.exports = mongoose.model('Agenda', agendaSchema);

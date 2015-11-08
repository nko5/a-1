"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  sequenceNumber: Number,
  description: {type: String, default: ''},
  type: {type: String, default: ''},
  startTime: {type: Date},
  duration: {type: Number},
  location: {type: String, default: ''}
});

exports = module.exports = mongoose.model('Task', taskSchema);

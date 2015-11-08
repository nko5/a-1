"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  description: {type: String, default: ''},
  type: {type: String, default: ''},
  duration: {type: String},
  location: {type: String, default: ''}
});

exports = module.exports = mongoose.model('Task', taskSchema);

"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {type: String, default: ''},
  type: {type: String, default: ''},
  description: {type: String, default: ''},
  duration: {type: Number},
  location: {type: Schema.Types.ObjectId, ref: 'Address'}
});

exports = module.exports = mongoose.model('Task', taskSchema);

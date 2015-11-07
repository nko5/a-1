"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    displayName: String,
    google: String,
    firstName: String,
    lastName: String,
    address: {type: Schema.Types.ObjectId, ref: 'Address'},
    agendas: [{type: Schema.Types.ObjectId, ref: 'Agenda'}]
});

exports = module.exports = mongoose.model('User', userSchema);

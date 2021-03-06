"use strict";

const User = require('../models/user');

module.exports.getUserAccount = function(req, res) {
    User.findById(req.user, null, { populate: 'agendas' }, function (err, user) {
        if (err) {
            return res.json(err);
        }
        res.json(user);
    });
};

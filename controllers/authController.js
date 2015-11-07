"use strict";

const request = require('request');
var User = require('../models/user');
var jwt = require('jwt-simple');
var moment = require('moment');

function createToken(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, process.env.TOKEN_SECRET);
}

function createNewUser(signInMethod, profile, res) {
    var user = new User();

    //user details
    user.displayName = profile.name;
    user.email = profile.email;

    if (signInMethod === 'google') {
        user.google = profile.sub;
        user.firstName = profile.given_name;
        user.lastName = profile.family_name;
    }

    //first save user profile and then update that id in user details
    user.save(function (err, doc) {
        if (err) {
            res.status(500).send({message: 'Error creating user'});
        }

        res.send({token: createToken(user)});
    });
}

module.exports.ensureAuthenticated = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({message: 'Please make sure your request has an Authorization header'});
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, process.env.TOKEN_SECRET);
    if (payload.exp <= moment().unix()) {
        return res.status(401).send({message: 'Token has expired'});
    }
    req.user = payload.sub;
    next();
};

module.exports.getGoogleAuthToken = function (req, res) {

    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: process.env.GOOGLE_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, {
        json: true,
        form: params
    }, function (err, response, token) {
        var accessToken = token.access_token;
        var headers = {
            Authorization: 'Bearer ' + accessToken
        };

        // Step 2. Retrieve profile information about the current user.
        request.get({
            url: peopleApiUrl,
            headers: headers,
            json: true
        }, function (err, response, profile) {
            // Step 3a. Link user accounts.
            if (req.headers.authorization) {
                User.findOne({
                    google: profile.sub
                }, function (err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({
                            message: 'There is already a Google account that belongs to you'
                        });
                    }
                    var token = req.headers.authorization.split(' ')[1];
                    var payload = jwt.decode(token, config.TOKEN_SECRET);

                    User.findById(payload.sub, function (err, user) {
                        if (!user) {
                            return res.status(400).send({
                                message: 'User not found'
                            });
                        }
                        user.google = profile.sub;
                        user.displayName = user.displayName || profile.name;
                        user.save(function () {
                            var token = createToken(user);
                            res.send({
                                token: token
                            });
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({
                    google: profile.sub
                }, function (err, existingUser) {
                    if (existingUser) {
                        return res.send({
                            token: createToken(existingUser)
                        });
                    }
                    createNewUser('google', profile, res);
                });
            }
        });
    });
};



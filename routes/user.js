// Base route is /user
var _ = require('lodash');
var express = require('express');
var validator = require('validator');
var user = require('../models/user');

var app = express();

var registerGet = function(req, res) {
  console.log(validationErrors);
  res.render('user/register', {
    title: 'User Sign-up',
    validationErrors: validationErrors,
  });
};

var registerPost = function (req, res) {
  var hasErrors = false;
  var validationErrors = {};

  var username = _.get(req, 'body.registration.username', '');
  var email = _.get(req, 'body.registration.email', '');
  var password = _.get(req, 'body.registration.password', '');

  if (!validator.isLength(username, {min:3, max:20})) {
    hasErrors = true;
    validationErrors.username = 'Length of username should be between 3 and 20';
  }
  if (!validator.isEmail(email)) {
    hasErrors = true;
    validationErrors.email = 'Email address should be valid';
  }
  if (!validator.isLength(password, {min:3, max:20})) {
    hasErrors = true;
    validationErrors.password = 'Length of password should be between 3 and 20';
  }

  if (!hasErrors) {
    user.add(username, email, password);
  }

  console.log(validationErrors);
  res.render('user/register', {
    title: 'User Sign-up',
    validationErrors: validationErrors,
  });
};

app.route('/register')
  .get(registerGet)
  .post(registerPost);

module.exports = app;

// Base route is /user
var _ = require('lodash');
var express = require('express');
var mongo = require('mongodb');

var app = express();

var registerGet = function(req, res) {
  res.render('user/register', {
    title: 'User Sign-up'
  });
};

var registerPost = function (req, res) {
  var username = _.get(req, 'body.registration.username', '');
  console.log(username);
  res.render('user/register', {
    title: 'User Sign-up'
  });
};

app.route('/register')
  .get(registerGet)
  .post(registerPost);

module.exports = app;

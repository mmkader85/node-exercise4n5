/**
 * Created by muhammed on 8/1/17.
 */

var express = require('express');
var app = express();

var dbconfig = require('../config/dbconfig');
var MongoClient = require('mongodb').MongoClient;

var config = '', connectUrl = '';

if (app.get('env') == 'development') {
  config = dbconfig.development;
  connectUrl = 'mongodb://' + config.host + ':' + config.port + '/' + config.database;
} else if (app.get('env') == 'production') {
  config = dbconfig.production;
  connectUrl = 'mongodb://' + config.user + ':' + config.password + '@' +
    config.host + ':' + config.port + '/' + config.database;
}

MongoClient.connect(connectUrl, function (err, db) {
  console.log('Connection Successful');
});

var user = {
  add: function (username, email, password) {
    console.log('validate and store user : ' + username);
  }
};

module.exports = user;
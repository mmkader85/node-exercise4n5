/**
 * Created by muhammed on 8/1/17.
 */

var express = require('express');
var app = express();

var config = require('../config/config');
var MongoClient = require('mongodb').MongoClient;

var dbconfig = '', collections = config.collections, connectUrl = '';

if (app.get('env') == 'development') {
  dbconfig = config.dbconfig.development;
  connectUrl = 'mongodb://' + dbconfig.host + ':' + dbconfig.port + '/' + dbconfig.database;
}
else if (app.get('env') == 'production') {
  dbconfig = config.dbconfig.production;
  connectUrl = 'mongodb://' + dbconfig.user + ':' + dbconfig.password + '@' +
    dbconfig.host + ':' + dbconfig.port + '/' + dbconfig.database;
}

var user = {
  add: function (username, email, password) {
    MongoClient.connect(connectUrl, function (err, db) {
      if (err === null) {
        console.log('Connection Successful');
        var collection = db.collection(collections.users);
        collection
          .findOne({username:username})
            .then(function(doc) {
              console.log(doc);
            });

        var userData = {
          username: username,
          email: email,
          password: password,
          createdTime: +new Date()
        };
      }
      else {
        console.log('Connection Error');
        console.log(err);
        process.exit();
      }
      db.close();
    });
  }
};

module.exports = user;
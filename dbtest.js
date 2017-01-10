/**
 * Created by muhammed on 10/1/17.
 */

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017/muhammed';

MongoClient.connect(url, function (err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  /*insertDocuments(db, function(result) {
    console.log(result);
    db.close();
  });*/

  findDocuments(db, function() {
    db.close();
  });

  /*insertDocuments(db, function() {
    findDocuments(db, function() {
      db.close();
    });
  });*/
});

var insertDocuments = function (db, callback) {
  var collection = db.collection('documents');
  collection.insertMany([
    {a: 1}, {a: 2}, {a: 3}
  ], function (err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

var findDocuments = function(db, callback) {
  var collection = db.collection('documents');
  collection
  /*.findOne({username:username})
  .then(function(doc) {
    console.log(doc);
  });*/

  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs.length);
    callback(docs);
  });
}
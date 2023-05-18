var express = require("express");
var router = express.Router();
var config = require("../config.js");
var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var mongoClientSub = mongodb.MongoClient;
var categories;

mongoClient.connect(config.mongodbUrl, function (err, db) {
  if (err) throw err;
  categories = db.collection("categories");
});

mongoClientSub.connect(config.mongodbUrl, function (err, db) {
  if (err) throw err;
  subcategories = db.collection("subcategories");
});

router.get("/", function (req, res, next) {
  categories.find().toArray(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
});

router.get("/:id", function (req, res, next) {
  var categoryId = req.params.id;
  console.log({ _id: new mongodb.ObjectId(categoryId) });
  categories.findOne(
    { _id: new mongodb.ObjectId(categoryId) },
    function (err, docs) {
      if (err) throw err;
      res.json(docs);
    }
  );
});

router.post("/", function (req, res, next) {
  categories.save(req.body, function (err, result) {
    if (err) throw err;
    res.json(req.body);
  });
});

router.put("/", function (req, res, next) {
  var _id = new mongodb.ObjectID(req.body._id);
  delete req.body._id;
  categories.updateOne(
    { _id: _id },
    { $set: req.body },
    function (err, result) {
      if (err) throw err;
      res.json(req.body);
    }
  );
});

router.delete("/", function (req, res, next) {
  categories.deleteOne(
    { _id: new mongodb.ObjectID(req.body._id) },
    function (err, result) {
      if (err) throw err;
      res.json(req.body);
    }
  );
});

module.exports = router;

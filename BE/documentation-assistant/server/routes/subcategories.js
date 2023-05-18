var express = require("express");
var router = express.Router();
var config = require("../config.js");
var mongodb = require("mongoose");
var mongoClient = mongodb.MongoClient;

var subcategories;
mongodb.set("strictQuery", false);
mongodb.connect(config.mongodbUrl, function (err, db) {
  if (err) throw err;
  subcategories = db.collection("subcategories");
});

router.get("/", function (req, res, next) {
  subcategories.find().toArray(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
});

router.get("/:id", function (req, res, next) {
  var categoryId = req.params.id;
  subcategories.findOne(
    { _id: new mongodb.ObjectID(categoryId) },
    function (err, docs) {
      if (err) throw err;
      res.json(docs);
    }
  );
});

router.post("/", function (req, res, next) {
  subcategories.save(req.body, function (err, result) {
    if (err) throw err;
    res.json(req.body);
  });
});

router.put("/", function (req, res, next) {
  var _id = new mongodb.ObjectID(req.body._id);
  delete req.body._id;
  subcategories.updateOne(
    { _id: _id },
    { $set: req.body },
    function (err, result) {
      if (err) throw err;
      res.json(req.body);
    }
  );
});

router.delete("/", function (req, res, next) {
  subcategories.deleteOne(
    { _id: new mongodb.ObjectID(req.body._id) },
    function (err, result) {
      if (err) throw err;
      res.json(req.body);
    }
  );
});

module.exports = router;

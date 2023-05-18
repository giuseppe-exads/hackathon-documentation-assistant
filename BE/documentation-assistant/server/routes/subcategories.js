var express = require("express");
var router = express.Router();
var config = require("../config.js");
var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var categories;
var subcategories;
//mongodb.set("strictQuery", false);
mongoClient.connect(config.mongodbUrl, function (err, db) {
  if (err) throw err;
  categories = db.collection("categories");
});
mongoClient.connect(config.mongodbUrl, function (err, db) {
  if (err) throw err;
  subcategories = db.collection("subcategories");
});

router.get("/", function (req, res, next) {
  subcategories
    .aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "relatedCategory",
          foreignField: "_id",
          as: "categories_join",
        },
      },
      {
        $project: {
          name: 1,
          link: 1,
          levelOfCategory: 1,
          textDoc: 1,
          relatedCategory: 1,
          categories_join: 1,
        },
      },
    ])
    .toArray(function (err, docs) {
      if (err) throw err;
      res.json(docs);
    });
});

router.get("/:id", function (req, res, next) {
  var categoryId = req.params.id;
  subcategories
    .aggregate([
      {
        $match: {
          _id: new mongodb.ObjectId(categoryId),
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "relatedCategory",
          foreignField: "_id",
          as: "categories_join",
        },
      },
      {
        $project: {
          name: 1,
          link: 1,
          levelOfCategory: 1,
          textDoc: 1,
          relatedCategory: 1,
          categories_join: 1,
        },
      },
    ])
    .toArray(function (err, docs) {
      if (err) throw err;
      res.json(docs);
    });
});

router.post("/", function (req, res, next) {
  subcategories.save(req.body, function (err, result) {
    if (err) throw err;
    res.json(req.body);
  });
});

router.put("/", function (req, res, next) {
  var _id = new mongodb.ObjectId(req.body._id);
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
    { _id: new mongodb.ObjectId(req.body._id) },
    function (err, result) {
      if (err) throw err;
      res.json(req.body);
    }
  );
});

module.exports = router;

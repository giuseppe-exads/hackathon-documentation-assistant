var express = require("express");
var router = express.Router();

router.use("/categories", require("./categories.js"));

module.exports = router;

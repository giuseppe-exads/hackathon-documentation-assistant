var express = require("express");
var router = express.Router();

router.use("/categories", require("./categories.js"));
router.use("/subcategories", require("./subcategories.js"));

module.exports = router;

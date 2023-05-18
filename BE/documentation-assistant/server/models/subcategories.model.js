const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcategorySchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 15 },
    levelOfCategory: { type: Number },
    link: { type: String },
    textDoc: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("subcategories", subcategorySchema);

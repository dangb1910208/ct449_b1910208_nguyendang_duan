const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: Array,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  id_category: {
    type: ObjectId,
    required: true,
  },
});
module.exports = mongoose.model("Products", productSchema);

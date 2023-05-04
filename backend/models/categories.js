const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Categories", categorySchema);

const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  address: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
    unique: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Contacts", contactSchema);

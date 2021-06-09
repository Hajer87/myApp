const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  phoneNumber: Number,
  city: String,
  street: String,
  state: String,
  postal_code: Number,
  

});

module.exports = mongoose.model("profile", profileSchema);

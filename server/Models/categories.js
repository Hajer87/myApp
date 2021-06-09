const mongoose = require("mongoose");
const categoriesSchema = new mongoose.Schema({
  name: String,
  image: String,
  ingredient: [
    {
      type: mongoose.Types.ObjectId,
      ref: "ingredient",
      required: true
    }
  ],
  
},
{ timestamps: true }
);

module.exports = mongoose.model("categories", categoriesSchema);
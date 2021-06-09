const mongoose = require("mongoose");
const ingredientSchema = new mongoose.Schema({
 
  name: { type: String },
  price: {
    type: Number,
    
  },
  description: {
    type: String,
     
    trim:true
  },
  price:{
    type:Number
  },
  category:{ type: mongoose.Types.ObjectId,
  ref:'categories'},
  image: { 
   type: String
  },
  
},
{ timestamps: true }
);

module.exports = mongoose.model("ingredient", ingredientSchema);
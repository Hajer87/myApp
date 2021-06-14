const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String, required: true
    },
    lastname: {
      type: String, required: true
    },
    email: {
      type: String, required: true, unique: true
    },
    password: {
      type: String, required: true
    },
    isAdmin: {
      type: Boolean, required: true, default: false
    },
    ville:{
      type: String, required:true
    },
    city:{
      type: String, required:true
    },
    codePostal:{
      type:Number, required:true
    },
    phoneNumber:{
      type: Number, required:true
    },
    avatar: {
      type: String
    },
    commandes:[{
      type: mongoose.Types.ObjectId,
      ref: "order",
     
    }]
  },
  { timestamps: true }
);



module.exports= mongoose.model('user', userSchema);
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
    commandes:[{
      type: mongoose.Types.ObjectId,
      ref: "order",
     
    }]
  },
  { timestamps: true }
);



module.exports= mongoose.model('user', userSchema);
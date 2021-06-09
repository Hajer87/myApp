const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({

commandes:[

   [ {type:mongoose.Schema.Types.ObjectId,
  ref:'ingredient'}]
    ]
,
user:{type: mongoose.Schema.Types.ObjectId,
  ref:'user'},
date:String,
heure:String,
tel:String,
address:String,
livraison:String,
total:Number,
 delivred: {
   type:String,
   default: "false"
},

  },
  { timestamps: true }

  )

module.exports = mongoose.model('order', orderSchema) 

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
isDelivered: {
  type: Boolean, required: true, default: false
},
deliveredAt: {
  type: Date
}

  },
  { timestamps: true }

  )

module.exports = mongoose.model('order', orderSchema) 

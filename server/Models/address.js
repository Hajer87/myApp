const mongoose = require('mongoose')
const adressSchema = mongoose.Schema({

state: {
                         type: String,
                         required: true
},
City: {
                         type: String,
                         required: true
},
postal_code:{
                         type: Number,
                         required: true
}


})

module.exports = mongoose.model("address", addressSchema);
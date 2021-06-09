const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shippingSchema = new Schema({
 
prixUnitaire: Number
})
module.exports = mongoose.model('shipping', shippingSchema)

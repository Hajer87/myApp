const express = require("express");
const router = express.Router();
const authAdmin = require('../../middelwares/authAdmin')
const Shipping=require('../../Models/Shipping')




router.post ('/',/*  authAdmin, */ async (req,res)=>{
try{
const {prixUnitaire}=req.body
const shipping= new Shipping({prixUnitaire})
await shipping.save()
}catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
})


router.get('/', /*authAdmin, */ async (req,res)=>{
try{
const shipping= await Shipping.find({})
res.status(200).json(shipping);
} catch (err) {
  console.log(err.message);
  res.status(500).send("server error");
}
})

router.put('/' ,/*authAdmin, */ async (req,res)=>{
try{
const update= req.body 

await Shipping.update(update)

res.status(200).json("shipping uptated");
} catch (err) {
console.log(err.message);
res.status(500).send("server error");
 }
})                  

module.exports = router;

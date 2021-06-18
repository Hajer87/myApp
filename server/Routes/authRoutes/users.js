const express = require("express");
const authAdmin = require("../../middelwares/authAdmin");
const Authmiddelware = require("../../middelwares/Authmiddelware");
const User = require("../../Models/user");

const router = express.Router();


const multer = require('multer');
const storage=multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/Users');
  },
  filename: function(req, file, cb){
   cb(null, Date.now() + file.originalname)  }
})
const fileFilter=(req,file,cb)=>{
  if (file.mimetype==='image/jpeg' || file.mimetype==='image/png'||file.mimetype==='image/jpg')
  {cb(null, true);
  } else{
    cb(null, false)
  }
}
const upload=multer({
  storage:storage, limits:{
    fileSiza: 1024*1024*5
  },
  fileFilter: fileFilter
})




router.get("/", Authmiddelware, authAdmin, async (req, res) => {
  try {
    const users = await User.find({}).populate('order');
    res.status(200).json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

router.put("/:id", Authmiddelware, async (req, res) => {
  try {
    console.log(req.body)

     await User.findByIdAndUpdate(
      { _id: req.params.id },
      {/* $set:{fristname:req.body.fristname, lastname:req.body.lastname, phoneNumber:req.body.phoneNumber, email: req.body.email, ville: req.body.ville, city:req.body.city, codePostal:req.body.codePostal} */  ...req.body},
      
    );
    
    const x= await User.findOne({_id: req.params.id})
    console.log(x)
    
  
    res.status(200).json('modified')
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});



router.put("/:id/avatar", Authmiddelware,  upload.single('image'), async (req, res) => {
  try {
    console.log(req.body)
    const path= `${req.protocol}://${req.get('host')}/uploads/users/${req.file.filename}`
     await User.findByIdAndUpdate(
      { _id: req.params.id },
      {$set:{avatar: path}},
      
    );
    
    const x= await User.findOne({_id: req.params.id})
    console.log(x)
    
  
    res.status(200).json('modified')
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});


module.exports = router;

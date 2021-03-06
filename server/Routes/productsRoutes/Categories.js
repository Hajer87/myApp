const express = require("express");
const router = express.Router();
const Categories = require("../../Models/categories");
const { check, validationResult } = require("express-validator");
const authAdmin = require('../../middelwares/authAdmin')
const authmiddelware=require('../../middelwares/Authmiddelware');
const multer = require("multer");

const storage=multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/categories');
  },
  filename: function(req, file, cb){
   cb(null, Date.now() + file.originalname)  }
})
const fileFilter=(req,file,cb)=>{
  if (file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/jpg')
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
//post category
router.post(
  "/newCategory",
authAdmin, 



upload.single('image'), 
  async (req, res) => {
   
    try {
      const {name, image}=req.body
          
      let cat= await Categories.findOne({ name });
      if (cat) {
        return res
          .status(400)
          .json({
            errors: [
              { msg: "cette Catégory existe déjà dans notre base de données" },
            ],
          });
      }
      const body=JSON.parse(req.body.info)
      const category = new Categories({
name:body.name, image: `${req.protocol}://${req.get('host')}/uploads/categories/${req.file.filename}` });

      await category.save();
      console.log(category)
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);
// get one  Categorie
router.get("/:id", async (req, res) => {
  try {
    const category = await Categories.findOne({ _id: req.params.id }).populate('ingredient');
        if (!category) {
      return res.status(404).json({ errors: [{ msg: "Category not found" }] });
    }
    res.status(200).json(category);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({errors:[{msg:"server error"}]});
  }
});
// delete category
router.delete('/:id', authAdmin, async (req,res)=>{

  try{  
 const category= await Categories.findOneAndRemove({ _id: req.params.id });

 if (!category) {
  return res.status(404).json({ errors: [{ msg: "Category not found" }] });
}
  
  res.status(200).json("category deleted");

  }catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
}
})
// update Catégory
router.put('/:id',authAdmin, upload.single('image'), async (req,res)=>{
  try{
    const {info, image}=req.body
console.log((req.body.info))
const body = req.file ?
    {
      ...JSON.parse(req.body.info),
     image: `${req.protocol}://${req.get('host')}/uploads/categories/${req.file.filename}`
    } :JSON.parse(req.body.info); 
  Categories.findByIdAndUpdate({ _id: req.params.id }, body)
    .then(() => res.status(200).json({ message: 'Category  modifié !'}))
  }catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }}) 

// get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Categories.find().populate("ingredient").select("-__v");
    ;

    res.status(200).json(categories);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;

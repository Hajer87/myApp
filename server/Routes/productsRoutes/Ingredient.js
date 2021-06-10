const express = require("express");
const router = express.Router();
const Ingredient=require("../../Models/ingredient")
const { check, validationResult } = require("express-validator");
const Categories = require("../../Models/categories");
const authAdmin = require('../../middelwares/authAdmin')


const multer = require('multer');
const storage=multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/ingredients');
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
 


//post ingredient
router.post(
  "/newIngredient", 
    authAdmin, 
    upload.single('image'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    try {
      const { name, category, image, description} = req.body;
      let Item= await Ingredient.findOne({ name });
      if (Item) {
        return res
          .status(400)
          .json({
            errors: [
              { msg: "this Ingredient exists in our database" },
            ],
          });
      }
      
    const path= `${req.protocol}://${req.get('host')}/uploads/ingredients/${req.file.filename}`
const body=JSON.parse(req.body.data)
      const ingredient = new Ingredient({name:body.name, description: body.description, price: body.price, category:body.category, image:path}); 
     
      
      await ingredient.save();
      console.log(ingredient)
      await Categories.findByIdAndUpdate({ _id: ingredient.category}, {$push: {ingredient: ingredient}})
      return res.status(200).json(ingredient);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

// get one  ingredient
router.get("/:id", async (req, res) => {
  try {
    
    const ingredient = await Ingredient.findOne({ _id: req.params.id }).populate("categories");
    console.log(ingredient);
        if (!ingredient) {
      return res.status(404).json({ errors: [{ msg: "ingredient not found" }] });
    }
    res.status(200).json(ingredient);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});
// delete ingredient
router.delete('/:id', authAdmin, async (req,res)=>{

  try{  
 const ingredient= await Ingredient.findByIdAndRemove({ _id: req.params.id });

 if (!ingredient) {
  return res.status(404).json({ errors: [{ msg: "ingredient not found" }] });
}
  
  res.status(200).json("ingredient deleted");

  }catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
}
})
 // update ingredient
router.put('/:id',authAdmin, upload.single('image'), async (req,res)=>{
  try{
console.log((req.body))
   
const body = req.file ?
    {
      ...JSON.parse(req.body.info),
      image: `${req.protocol}://${req.get('host')}/uploads/ingredients/${req.file.filename}`
    } : { ...req.body };
  Ingredient.findByIdAndUpdate({ _id: req.params.id }, {$set: body  }, {new:true})
    .then(() => res.status(200).json({ message: 'Ingredient modifié !'}))
  }catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }}) 

// get all categories
router.get("/", async (req, res) => {
  try {
    const items = await Ingredient.find().populate("category").select("-__v");

    res.status(200).json(items);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;


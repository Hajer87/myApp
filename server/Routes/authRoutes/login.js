const express = require("express");
const Authmiddelware = require("../../middelwares/Authmiddelware");
const User = require("../../Models/user");
const router = express.Router();
const dotenv = require("dotenv").config({ path: "../../config/.env" });
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authAdmin = require("../../middelwares/authAdmin");

router.get("/user", Authmiddelware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -_id -__v")
    if (!user) {
      return res.status(404).json({ errors: [{ msg: "user not found" }] });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("server Error");
  }
});

router.post(
  "/",

  // email must be format email
  check("email", "please enter a valid email").isEmail().normalizeEmail(),
  // password must be at least 5 chars long
  check("password", "password is required").exists(),

  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    // verify if user exists
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "This email address doesn't exist in our database" }] });}
         
      const isMatch = await bcrypt.compare(password, user.password)
     
      if (!isMatch) {
     return res
        .status(400)
        .json({ errors: [{ msg: "wrong password" }] });
      }
    
    
      //jsonwebtoken
      const payload = {
        user: {
          id: user._id,
        },
      };
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
   } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);



//register
router.post(
  "/",
  // firstname and lastname must be alphabetic
  check("firstname", "firstname is required")
    .isLength({ min: 3 })
    .trim()
    .escape(),
  check("lastname", "lastname is required")
    .isLength({ min: 3 })
    .trim()
    .escape(),
  // email must be format email
  check("email", "please enter a valid email").isEmail().normalizeEmail(),
  // password must be at least 5 chars long
  check(
    "password",
    "please enter a password with 8 or more characters"
  ).isLength({ min: 8 }),
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstname, lastname, email,  password } = req.body;
    
    try {
      // verify if user exists
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      //get user gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
 
      user = new User({
        firstname,
        lastname,
        email,
        avatar,
        password,
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      //jsonwebtoken
      const payload = {
        user: {
          id: user._id,
        },
      };
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

/* 
router.get("/me", Authmiddelware, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate({path:"user", select:{password:0, _id:0, __v:0, role:0}}).select("-_id -__v");

    if (!profile) {
      return res
        .status(400)
        .json({ errors: [{ msg: "There is no profile for this user" }] });
    }

    res.status(200).json(profile);

  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//post profile
//route profile/me

router.post(
  "/me",
  [
    Authmiddelware, 
    [
      check("phoneNumber", "phoneNumber is required").not().isEmpty(),
      check("postal_code","postal code is required" ).not().isEmpty().isLength({min:4, max:4}).withMessage('please enter a valid postal code'),
   ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { phoneNumber,  city, street, state, postal_code} = req.body;
    try {
      const profileFields = {};
      profileFields.user = req.user.id;
      
       if (phoneNumber) {profileFields.phoneNubmer = phoneNumber};
       if (city) {profileFields.city = city};
      if (street) {profileFields.street = street};
      if (state) {profileFields.state = state};
      if (postal_code) {profileFields.postal_code = postal_code};
      
      let profile = await Profile.findOne({ user: req.user.id });
      
      if (profile){
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );}
        //create
        profile= new Profile(profileFields)
        await profile.save()
        return res.status(200).json(profile)
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

//get all client profiles

router.get ('/', authAdmin,  async(req,res)=>{

  try{
    const clients=  await Profile.find()
    res.status(200).json(clients);
  }catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
})

//delete client and client profile
router.delete("/", authAdmin, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.status(200).json("user deleted");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
}); */

module.exports = router;





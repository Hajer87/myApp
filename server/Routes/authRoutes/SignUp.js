const express = require("express");
const router = express.Router();
const User = require("../../Models/user");

const { check, validationResult } = require("express-validator");
 const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const dotenv = require("dotenv").config({ path: "../../Config/.env" });

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

module.exports = router;

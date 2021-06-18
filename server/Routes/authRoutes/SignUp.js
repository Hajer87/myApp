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
  check("firstname", "veuillez insérer votre prénom")
    .isLength({ min: 3 })
    .trim()
    .escape(),
  check("lastname", "veuillez insérer votre nom")
    .isLength({ min: 3 })
    .trim()
    .escape(),
  // email must be format email
  check("email", "veuillez insérer un email valide ").isEmail().normalizeEmail(),
  // password must be at least 5 chars long
  check(
    "password",
    "veuillez insérer un mot de passe de minimum 8 caractères"
  ).isLength({ min: 8 }),
  check('ville', "veuillez insérer votre ville de résidence").isLength({ min: 3 })
  .trim()
  .escape(),
  check('city', "veuillez insérer votre cité").isLength({ min: 3 })
  .trim()
  .escape(),
  check('codePostal', "veuillez insérer un code postale correct").isLength({ min: 3 })
  .isNumeric()
  .trim()
  .escape(),
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstname, lastname, city, ville, codePostal, email,  password, phoneNumber } = req.body;
    
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
        city,
        codePostal,
        ville,
        avatar,
        password,
        phoneNumber
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

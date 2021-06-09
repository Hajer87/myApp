const express = require("express");
const router = express.Router();
const Profile = require("../Models/profil");
const User = require("../Models/user");

const Authmiddelware = require("../middelwares/Authmiddelware");
const { check, validationResult } = require("express-validator");

//get  profile
// route GET /profile/me

module.exports = router;

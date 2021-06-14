const express = require("express");
const authAdmin = require("../../middelwares/authAdmin");
const Authmiddelware = require("../../middelwares/Authmiddelware");
const User = require("../../Models/user");

const router = express.Router();

router.get("/", Authmiddelware, authAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

router.put("/:id", Authmiddelware, async (req, res) => {
  try {
    const user = User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(user)
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;

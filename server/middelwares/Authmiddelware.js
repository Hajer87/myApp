const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({ path: "../Config/.env" });

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");
  //check if not token
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: "No token, authorization denied" }] });
  }
  //verify token
  try{
const decoded=jwt.verify(token, process.env.SECRET_KEY)
req.user=decoded.user;
next();
  }
  catch(err) {
res.status(401).json({errors:[{msg: 'token is not valid'}]})
  }
};

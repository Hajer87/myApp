const Users = require('../Models/user')
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({ path: "../Config/.env" });

const authAdmin = async (req, res, next) =>{
    const token = req.header("x-auth-token");


    try {const decoded=jwt.verify(token, process.env.SECRET_KEY)
        req.user=decoded.user;
        // Get user information by id
        const user = await Users.findOne({
            _id: req.user.id
        })
        if(!user.isAdmin)
            return res.status(400).json({msg: "Admin resources access denied"})

        next()
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authAdmin
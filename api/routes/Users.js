const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require('../model/User');
//require('../../mongo.config');


router.get("/", async (req,res,next)=>{
try{
    const  users = await User.find({});
    res.send(users);

}catch(e){
    res.status(500)
}
});

router.post("/",async (req,res,next)=>{
    //try{
        const user = new User();
        user.firstName  =   req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.userName = req.body.userName;
        user.password = req.body.password;
       
       await user.save();
       res.status(201).json({msg:"User Added Successfully",user:user});

    // }catch(error){
    //     res.status(500)
    // }
});

module.exports = router;
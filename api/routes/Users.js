const express = require("express");
const router = express.Router();
const User = require('../model/User');
const Role = require('../model/Role');
//require('../../mongo.config');


router.get("/", async (req,res,next)=>{
try{
    const  users = await User.find({}).populate('role').exec()
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
        user.role =  req.body.role;
       
       await user.save();
       res.status(201).json({msg:"User Added Successfully",user:user});

    // }catch(error){
    //     res.status(500)
    // }
});

router.get("/role",async (req,res)=>{
        const roles = await Role.find({});
        res.send(roles)
})

//add new role
router.post("/role",async (req,res)=>{

    const role = new Role();
    role.role = req.body.role;
    await role.save();
    res.status(201).json({msg:"User Role added Successfully",role:role});
});

module.exports = router;
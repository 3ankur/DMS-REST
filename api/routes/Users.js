const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require('../model/User');
const Role = require('../model/Role');
const userProject = require("../model/UserProject");
const jwt = require('jsonwebtoken');
require('dotenv').load();
//require('../../mongo.config');


router.get("/", async (req,res,next)=>{
try{
    const usersWhoAlradyAssigned = await userProject.find({isActive:true}).select("user")
    const tmpArr=[];
    usersWhoAlradyAssigned.forEach(v=>{
        tmpArr.push(v.user);
    })
    const  users = await User.find({_id:{$nin:tmpArr}})
    .populate('role')
    .exec()
    res.send(users);
    //res.status(200).json({"users":users,"assignedUser":usersWhoAlradyAssigned})

}catch(e){
    res.status(500)
}
});

router.post("/",async (req,res,next)=>{
    //try{
        console.log(req.body)
        const user = new User();
        user.firstName  =   req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.userName = req.body.userName;
        user.password = req.body.password;
        user.role =  req.body.role;

       const hashPwd = await bcrypt.hash(req.body.password,10)
       console.log(hashPwd);
       user.password = hashPwd;
       await user.save();
       const users = await User.find({}).exec();
       res.status(201).json({msg:"User Added Successfully","users":users});

    // }catch(error){
    //     res.status(500)
    // }
});

//login 
router.post("/login",async(req,res)=>{
    const user = await User.findOne({email:req.body.email}).populate('role');
    console.log(user)
    if(user){
        const result = await  bcrypt.compare(req.body.password, user.password);
        if(result){
         const token =  jwt.sign({
                email:user.email,
                userName:user.userName,
                role:user.role.role,
                userId:user._id
            },process.env.JWT_KEY,{ expiresIn: '1h'})
            res.status(200).json({"msg":"Auth Success","isValid":result,"token":token,role:user.role.role})
        }
        else{
            res.status(401).json({msg:"Auth faild"})
        }
    }else{
        res.status(401).json({msg:"Auth faild"})
    }

})

router.get("/role",async (req,res)=>{
        const roles = await Role.find({});
        res.send(roles)
})

router.get("/validateUserName/:uname",async (req,res)=>{
    console.log(req.params)
    const user = await User.find({userName:req.params.uname});
    res.send(user)
})

//add new role
router.post("/role",async (req,res)=>{

    const role = new Role();
    role.role = req.body.role;
    await role.save();
    res.status(201).json({msg:"User Role added Successfully",role:role});
});

module.exports = router;
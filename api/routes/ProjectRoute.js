const express = require("express");
const router = express.Router();
const Project = require("../model/ProjectModel");
const TaskTypes = require("../model/TaskTypeModel");
const TaskPriority = require("../model/taskPriorityModel");
const TaskStatus = require("../model/TaskStatusModel");
const UserProject  = require("../model/UserProject");
const alluserInfo  = require("../model/User")


//for getting the project
router.get("/",async (req,res)=>{
    const projects = await Project.find({}).exec();
    res.send(projects)
});

//for adding new project
router.post("/" , async (req,res)=>{
    const project = new Project();
    project.projectName = req.body.name;
    project.description = req.body.description  ? req.body.description  : "";
    await project.save();
    const projects = await Project.find({}).exec();
    res.status(201).json({message:"Project created successfully",project:projects})
});


//get the story type
router.get("/storytype",async (req,res)=>{
    const taskTypes = await TaskTypes.find({}).exec();
    res.send(taskTypes)
});

//add new stoty type
router.post("/storytype" , async (req,res)=>{
    const taskType = new TaskTypes();
    taskType.name = req.body.name;
    await taskType.save();
    res.status(201).json({message:"New  Type added ",taskType:taskType})
});

// get task priority
router.get("/storyPriority",async (req,res)=>{
    const storyPriorities = await TaskPriority.find({}).exec();
    res.send(storyPriorities)
});

//add new  priority
router.post("/storyPriority" , async (req,res)=>{
    const storyPriority = new TaskPriority();
    storyPriority.priority = req.body.priority;
    await storyPriority.save();
    res.status(201).json({message:"New  Type added ",storyPriority:storyPriority})
});

//get the tasks status
router.get("/storyStatus",async (req,res)=>{
    const taskStatus = await TaskStatus.find({}).exec();
    res.send(taskStatus)
});

//add new  status
router.post("/storyStatus" , async (req,res)=>{
    const taskStatus = new TaskStatus();
    taskStatus.status = req.body.status;
    await taskStatus.save();
    res.status(201).json({message:"New  Status added ",status:taskStatus})
});

//add user to project 
router.post("/addUserIntoProject", async (req,res)=>{

    // check for if user alrady present or active
    const searchRs = await UserProject.find({userId:req.body.userId,projectId:req.body.projectId})
    
 if(searchRs.length>0){
    res.status(403).json({message:"User alrady Added to project"})
 }
 else{
    const userProject = new UserProject();
    userProject.projectId = req.body.projectId;
    userProject.user = req.body.userId;
    userProject.isActive = true
    await userProject.save();
    res.status(201).json({message:"User added to project"});
 }

});

//get proect team 
router.get("/team/:id",async (req,res)=>{//,'firstName lastName email userName role'
    const  dt = await UserProject.find({projectId:req.params.id})

    .populate({
        path: 'user',
        select:'firstName lastName email userName role',
        populate: { path: 'role' }
      });
    // .populate('user')
    // .exec()
    res.status(200).json({"users":dt});
  
})

module.exports = router;
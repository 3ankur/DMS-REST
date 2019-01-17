const express = require("express");
const router = express.Router();
const Project = require("../model/ProjectModel");
const TaskTypes = require("../model/TaskTypeModel");
const TaskPriority = require("../model/taskPriorityModel");
const TaskStatus = require("../model/TaskStatusModel");

//for getting the project
router.get("/",async (req,res)=>{
    const projects = await Project.find({}).exec();
    res.send(projects)
});

//for adding new project
router.post("/" , async (req,res)=>{
    const project = new Project();
    project.projectName = req.body.name;
    await project.save();
    res.status(201).json({message:"Project created successfully",project:project})
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

module.exports = router;
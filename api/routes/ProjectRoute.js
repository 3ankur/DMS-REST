const express = require("express");
const router = express.Router();
const multer = require("multer");
const Project = require("../model/ProjectModel");
const TaskTypes = require("../model/TaskTypeModel");
const TaskPriority = require("../model/taskPriorityModel");
const TaskStatus = require("../model/TaskStatusModel");
const UserProject  = require("../model/UserProject");
const alluserInfo  = require("../model/User")
const checkAuth = require("../middleware/check-auth");
const UsertNew = require("../model/UserTemp");
const mongoose = require("mongoose");
const TaskComments = require("../model/TaskComments");
//const Schedule = require('node-schedule');

// var j = Schedule.scheduleJob('* * * * *', function(){
//     console.log('The answer to life, the universe, and everything!');
//   });
//   console.log(j.nextInvocation())

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {

        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, Date.now() + ext)

      //cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({storage: storage,limits: {fileSize: 1000000}});
 const TaskModel =  require("../model/AddNewTask")

//import  TaskModel from "../model/AddNewTask";



//for getting the project checkAuth
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
  
});

//create new task
router.post("/addTask", upload.single("image"), async (req,res)=>{
    console.log(req.file);
    const projectInfo =await Project.findById(req.body.project);
    //Project.findOne({_id:new ObjectId(req.body.project)});
    let name = projectInfo.projectName.charAt(0)+projectInfo.projectName.charAt(1);

    const taskCount = await TaskModel.find({});
    let taskCode = `${name.toUpperCase()}-${taskCount.length+1}`;
    const newTask = new TaskModel();
    newTask.type = req.body.type ? req.body.type : "Story";
    newTask.taskCode = taskCode;
    newTask.title = req.body.title;
    newTask.summary = req.body.summary;
    newTask.priority = req.body.priority;
    newTask.dueDate = req.body.dueDate;
    newTask.assignTo = req.body.assignTo;
    newTask.description = req.body.description;
    newTask.project = req.body.project;
    newTask.status = "TODO";
    await newTask.save();
    res.status(201).json({"msg":"Task Created",task:newTask,"Info":projectInfo,"code":taskCode})
    
});

//get the project task
router.get("/getTasks/:id",async (req,res)=>{
    const  lists = await TaskModel.find({project:req.params.id})
    .populate({
        path: 'assignTo',
        populate: { path: 'role' }
      });
    res.status(200).json({"tasks":lists});

});

router.get("/newuser",async (req,res)=>{//,'firstName lastName email userName role'
   console.log("sdsd");
    const  dt = await UsertNew.find({})
    res.status(200).json({"users":dt});
  
});

//getting the user activity
router.get("/userActivity",checkAuth,async (req,res)=>{
    var ObjectId = mongoose.Types.ObjectId; 
   const dt = await UserProject.find({user: new  ObjectId(req.userData.userId)});
   console.log(dt);

   const todoList = await TaskModel.find({project:dt[0]["projectId"],status:"TODO" }); 
   const doneList = await TaskModel.find({project:dt[0]["projectId"],status:"DONE" }); 
   const inPogressList = await TaskModel.find({project:dt[0]["projectId"],status:"INPOGRESS" }); 
   //mongoose.Types.ObjectId();
    res.status(200).json({"users": req.userData,
                info:dt,taskList:{todo:todoList,done:doneList,inPogress:inPogressList}});

});

router.put("/updateTaskStatus",async (req,res)=>{
    const taskInfo = await TaskModel.findByIdAndUpdate(req.body.taskId,req.body);
    if(taskInfo){

    }
    res.status(200).json({"info": taskInfo});
});

router.get("/taskdetail/:taskId",async (req,res)=>{
    if(req.params.taskId){
        const taskInfo = await TaskModel.findById(req.params.taskId)
        .populate({
            path: 'assignTo',
            populate: { path: 'role' }
          });
        res.status(200).json({"info": taskInfo});
    }
    else{
        res.status(400).json({"error": "Parameter missing"});
    } 
});

//get task comments 
router.get("/taskComments/:taskId",async (req,res)=>{
    if(req.params.taskId){
        const comments = TaskComments.find({task:req.params.taskId});
        res.status(200).json({"comments":comments});
    }else{
        res.status(400).json({"comments":comments});
    }
});

//add task comments 
router.post("/taskComments/:taskId",async (req,res)=>{
    if(req.params.taskId){
        const taskComment = new TaskComments();
        res.status(200).json({"comments":comments});
    }else{
        res.status(400).json({"comments":comments});
    }
});


//get task dates



module.exports = router;


const asyncHandler = require("express-async-handler");

const Project = require("../models/ProjectModel");
const Group = require("../models/GroupModel");

var fs = require('fs');
const jwt = require("jsonwebtoken");
const ObjectId = require('mongoose').Types.ObjectId;

const ongoing = asyncHandler (async (req,res)=>{
   try {
       const projects = await Project.find({ status: { $ne: 'completed' } })
        .sort({ createdAt: -1 }) // Sort in descending order based on the "createdAt" field
        .limit(5)
    
        res.status(200).json({ projects });
   } catch (err) {
       console.log(err)
   }
})

const list = asyncHandler(async (req, res) => {
    
    try {
        const token = req.cookies.jwt
        const details = jwt.decode(token)
        var projects = []
        const type = details.user.type
        
        const supervisorLookup = {
            $lookup: {
                from: "users",
                localField: "supervisor",
                foreignField: "_id",
                as: "supervisor",
            },
        }
        
      
        
        const employee2Lookup = {
            $lookup: {
                from: "users",
                localField: "employee2",
                foreignField: "_id",
                as: "employee2",
            },
        }
        
      
        
        const projectLookup =  {
            $lookup: {
                from: "projects",
                localField: "project",
                foreignField: "_id",
                as: "project",
            },
        }
        
        const project = {
            $project: {
                supervisor: { $arrayElemAt: ["$supervisor", 0] },
               employee2: { $arrayElemAt: ["$employee2", 0] },
                project: { $arrayElemAt: ["$project", 0] },
            },
        }
        
        
        if(type == "Admin"){
            const supervisor = details.user.id
            projects = await Group.aggregate([{
                $match: {
                    supervisor : new ObjectId(supervisor),
                },
            },employee2Lookup,projectLookup,supervisorLookup,project])
        }
        else if(type == "Manager"){
            projects = await Group.aggregate([employee2Lookup,projectLookup,supervisorLookup,project])
        }
        
        res.status(200).json({ projects });
    } catch (err) {
        console.log(err)
    }
    
})

const count = asyncHandler(async (req, res) => {
    
    const proposedCount = await Project.find({ status:"proposed" }).count()
    const acceptedCount = await Project.find({ status:"accepted" }).count()
    const requirementCount = await Project.find({ status:"requirement" }).count()
    const defenseCount = await Project.find({ status:"defense" }).count()
    const midCount = await Project.find({ status:"mid" }).count()
    const completedCount = await Project.find({ status:"completed" }).count()
    res.status(200).json({ proposedCount, acceptedCount,requirementCount,defenseCount,defenseCount,midCount,completedCount});
    
})

const add = asyncHandler(async (req, res) => {
    
    try {
        
        const token = req.cookies.jwt
        const tokenDetails = jwt.decode(token)
        
        const { title, details } = req.body
       
        const proposal = {
            data: fs.readFileSync((process.cwd() + '/uploads/' + req.files.proposal[0].filename)),
        }
    
        const project = await Project.create({
            title, details, status: 'none', proposal_document: proposal
        });
        
        employee = tokenDetails.user.id
        const filter = { $or: [{ 'employee2': employee }] };
        const update =  { $set:{ project: project._id }};
        
        const group = await Group.findOneAndUpdate(filter, update)
        
        if(group)
        res.status(200).json({ 'message': "Succussfully Added" });
        
        else
        throw new Error("error");
        
    } catch (err) {
        res.status(500).json({ 'message': e });
        
    }
    
})


const myProject = asyncHandler(async (req, res) => {
    
    try {
        const token = req.cookies.jwt
        const details = jwt.decode(token)
        
        employee = details.user.id
        const filter = { $or: [{ 'employee2': employee }] };
        const groupProject = await Group.findOne(filter).populate("project employee2 supervisor")
        
        res.status(200).json({  groupProject });
    } catch (err) {
        console.log(err)
    }
    
    
    
})

const update = asyncHandler(async (req, res) => {
try {
    var project
    const {id,status}=req.body
    
    const file = {
        data: fs.readFileSync((process.cwd() + '/uploads/' + req.file.filename)),
      }
    
    if(status == 'requirement')
     project = await Project.findByIdAndUpdate(id,{requirement_document:file,status})
    else if(status == 'defense')
     project = await Project.findByIdAndUpdate(id,{defense_document:file,status})
     else if(status == 'mid')
     project = await Project.findByIdAndUpdate(id,{mid_document:file,status})
     else if(status == 'completed')
     project = await Project.findByIdAndUpdate(id,{final_document:file,status})

     if(project)
     res.status(200).json({  'messgae':"success" });

} catch (err) {
    console.log(err)
}

})

module.exports = { add, list, myProject,count ,ongoing,update};
const asyncHandler = require("express-async-handler");

const Group = require("../models/GroupModel");
const User =  require("../models/UserModel")

const list = asyncHandler(async (req, res) => {
    
    try {
        const groups = await Group.find().populate('employee2 project supervisor')
        
        res.status(200).json({ groups });
    } catch (err) {
        res.status(500).json({ 'message': e });
        
    }
    
})

const without = asyncHandler(async (req, res) => {
    
    try {
        var employees=[]
        const groupEmployees = await Group.find({}).populate("employee2");
        
        if(groupEmployees)
        {
            const groupEmployeeIds = new Set();
            
            groupEmployees.forEach((group) => {
                groupEmployeeIds.add(group.employee2);
            });
            
            
            employees = await User.find({ type: "Employee", _id: { $nin: [...groupEmployeeIds] } });
        }else{
            employees = await User.find({ type: "Employee"});
            
        }
        
        
        res.status(200).json({ employees });
        
        
    } catch (err) {
        res.status(500).json({ 'message': e });
        
    }
    
})

const add = asyncHandler(async (req, res) => {
    
    try {
        let employee2 = req.body.valueEmployee2
        
        if (employee2 == '' || employee2 == '--SELECT--')
        employee2 = null
        
        const group = await Group.create({employee2 });
        
        if (group) {
            res.status(200).json({ 'message': "Succussfully Added" });
        } 
        
    } catch (err) {
        throw new Error(e);
    }
})

const attendees = asyncHandler(async (req, res) => {
    try {
        
        const {id} = req.params
        const group = await Group.findById(id)
        .select("employee2")
       .populate("employee2", "-password") // Populate employee2 with user details (excluding password)
        
        const employees = [ group.employee2];

        if(employees)
        res.status(200).json({ employees });
    } catch (err) {
        console.log(err)
    }

    
})

module.exports = { add, list,without,attendees };
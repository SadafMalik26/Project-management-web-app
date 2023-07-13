const asyncHandler = require("express-async-handler");

const Group = require("../models/GroupModel");
const User =  require("../models/UserModel")

const list = asyncHandler(async (req, res) => {
    
    try {
        const groups = await Group.find().populate('employee1 employee2 employee3 project supervisor')
        
        res.status(200).json({ groups });
    } catch (err) {
        res.status(500).json({ 'message': e });
        
    }
    
})

const without = asyncHandler(async (req, res) => {
    
    try {
        var employees=[]
        const groupEmployees = await Group.find({}).populate("employee1 employee2 employee3");
        
        if(groupEmployees)
        {
            const groupEmployeeIds = new Set();
            
            groupEmployees.forEach((group) => {
                groupEmployeeIds.add(group.employee1);
                groupEmployeeIds.add(group.employee2);
                groupEmployeeIds.add(group.employee);
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
        const employee1 = req.body.valueEmployee1
        let employee2 = req.body.valueEmployee2
        let employee3 = req.body.valueEmployee3
        
        if (employee2 == '' || employee2 == '--SELECT--')
        employee2 = null
        if (employee3 == '' || employee3 == '--SELECT--')
        employee3 = null
        
        const group = await Group.create({employee1, employee2, employee3 });
        
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
        .select("employee1 employee2 employee3")
        .populate("employee", "-password") // Populate employee1 with user details (excluding password)
        .populate("employee2", "-password") // Populate employee2 with user details (excluding password)
        .populate("employee3", "-password") // Populate employee3 with user details (excluding password)
        
        const employees = [group.employee1, group.employee2, group.employee3];

        if(employees)
        res.status(200).json({ employees });
    } catch (err) {
        console.log(err)
    }

    
})

module.exports = { add, list,without,attendees };
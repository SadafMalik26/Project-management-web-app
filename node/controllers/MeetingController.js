
const asyncHandler = require("express-async-handler");

const Meeting =  require("../models/MeetingModel")
const Group =  require("../models/GroupModel")
const jwt = require("jsonwebtoken");
const Notification = require("../models/NotificationModel");


const add = asyncHandler(async (req, res) => {
  const {id,attendees,currentDate} = req.body
  
  const token = req.cookies.jwt
  const details = jwt.decode(token)
  const teacher = details.user.id
  
  const meeting = await Meeting.create({group:id,attendees,currentDate,teacher})
  
  if(meeting)
  {
    
    res.status(200).json({'message':'Success!' });
  }
  
})

const list = asyncHandler(async (req, res) => {
  
  const token = req.cookies.jwt
  const details = jwt.decode(token)
  const id = details.user.id
  const type = details.user.type
  
  var meetings
  
  if(type == 'Teacher')
  {
    meetings= await Meeting.find({'teacher':id}).populate("attendees.employee", "username");
  }
  if(type == 'Employee')
  {
    const filter = { $or: [{ 'employee1': id }, { 'employee2': id }, { 'employee3': id }] };
    const group = await Group.findOne(filter)
    
    meetings= await Meeting.find({group}).populate("attendees.employee", "username")
  }
  
  res.status(200).json({meetings });
})

const percentage = asyncHandler(async (req, res) => {
  
  try {
    
    const {id} = req.params
    const meetings = await Meeting.find({group:id})
    .populate('attendees.employee')
    
    const employees = await calculatePercentage(meetings);
    
    res.status(200).json({employees });
    
  } catch (err) {
    console.log(err)
  }
})


async function calculatePercentage(meetings) {
  const employees = {};
  
  meetings?.forEach((meeting) => {
    meeting.attendees.forEach((attendee) => {
      const employeeId = attendee.employee._id.toString();
      if (attendee.present) {
        if (!employees[employeeId]) {
          employees[employeeId] = {
            attendanceCount: 1,
            totalMeetings: 1,
            employee: attendee.employee,
          };
        } else {
          employees[employeeId].attendanceCount++;
          employees[employeeId].totalMeetings++;
        }
      } else {
        if (!employees[employeeId]) {
          employees[employeeId] = {
            attendanceCount: 0,
            totalMeetings: 1,
            employee: attendee.employee,
          };
        } else {
          employees[employeeId].totalMeetings++;
        }
      }
    });
  });
  
  Object.keys(employees).forEach((employeeId) => {
    const employee = employees[employeeId];
    employee.percentage = (employee.attendanceCount / employee.totalMeetings) * 100;
  });
  
  return employees;
}
module.exports = { add, list,percentage};

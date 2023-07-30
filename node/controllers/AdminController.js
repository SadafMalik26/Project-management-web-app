const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel");
const Admin = require("../models/AdminModel");
const Slot = require("../models/AdminSlotsModel");
const Group = require("../models/GroupModel");
const Project = require("../models/ProjectModel");
const Notification = require("../models/NotificationModel");

const jwt = require("jsonwebtoken");
var fs = require('fs');

const ObjectId = require('mongoose').Types.ObjectId;

const type = 'Admin'

const add = asyncHandler(async (req, res) => {

  const { email, username, password, qualification, interest,
    jobtitle, experience, role, phoneno, joiningdate } = req.body

  try {

    const cover = {
      data: fs.readFileSync((process.cwd() + '/uploads/' + req.file.filename)),
      contentType: 'image/jpeg'
    }

    const user = await User.create({
      email, username, password, type, cover, qualification,interest,
      jobtitle, experience, role, phoneno, joiningdate
    });

    if (user) {

      const admin = await Admin.create({
        qualification, 'user': user._id, interest,
        jobtitle, experience, role, phoneno, joiningdate
      });

      if (admin)
        res.status(200).json({ 'message': "Succussfully Added" });

      else
        throw new Error("error");

    } else
      throw new Error("error");
  } catch (e) {
    res.status(500).json({ 'message': 'Email Already Taken' });
  }

})

const count = asyncHandler(async (req, res) => {

  try {
    const adminCount = await User.find({ type }).count()
    res.status(200).json({ adminCount });
  } catch (err) {
    console.log(err)
  }

})


const slotsCount = asyncHandler(async (req, res) => {
  try {
    const adminId = req.params.id

    const bookedCount = await Slot.find({ 'admin': adminId, isBooked: true }).count()

    const totalCount = await Slot.find({ 'admin': adminId }).count()
    const availableCount = totalCount - bookedCount

    res.status(200).json({ bookedCount, totalCount, availableCount });
  } catch (err) {
    console.log(err)
  }

})


const list = asyncHandler(async (req, res) => {

  try {
    const admins = await User.aggregate([
      {
        $match: {
          type
        }
      },
      {
        $lookup: {
          from: "admins",
          localField: "_id",
          foreignField: "user",
          as: "admin"
        }
      },
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          cover: 1,
          Qualification: { $arrayElemAt: ['$admin.qualification', 0] },
          Interest: { $arrayElemAt: ['$admin.interest', 0] },
          Jobtitle: { $arrayElemAt: ['$admin.jobtitle', 0] },
          Experience: { $arrayElemAt: ['$admin.experience', 0] },
          Role: { $arrayElemAt: ['$admin.role', 0] },
          Phoneno: { $arrayElemAt: ['$admin.phoneno', 0] },
          Joiningdate: { $arrayElemAt: ['$admin.joiningdate', 0] },
         }
      }
    ]).sort({ '_id': -1 })

    res.status(200).json({ admins });
  } catch (err) {
    console.log(err)
  }

})

const qualification = asyncHandler(async (req, res) => {


  try {
    const admin = await User.aggregate([
      {
        $match: {
          _id: new ObjectId(req.params.id)
        }
      },
      {
        $lookup: {
          from: "admins",
          localField: "_id",
          foreignField: "user",
          as: "admin"
        }
      },
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          cover: 1,
          Qualification: { $arrayElemAt: ['$admin.qualification', 0] },
          Interest: { $arrayElemAt: ['$admin.interest', 0] },
          Jobtitle: { $arrayElemAt: ['$admin.jobtitle', 0] },
          Experience: { $arrayElemAt: ['$admin.experience', 0] },
          Role: { $arrayElemAt: ['$admin.role', 0] },
          Phoneno: { $arrayElemAt: ['$admin.phoneno', 0] },
          Joiningdate: { $arrayElemAt: ['$admin.joiningdate', 0] },
        }
      }
    ])

    res.status(200).json({ 'admin': admin[0] });
  } catch (err) {
    console.log(err)
  }

})

const addSlot = asyncHandler(async (req, res) => {
  try {

    const token = req.cookies.jwt
    const details = jwt.decode(token)
    const { date, time } = req.body
    const adminId = details.user.id

    const slot = await Slot.create({
      admin: adminId,
      isBooked: false,
      date,
      time
    });

    if (slot)
      res.status(200).json({ 'message': "Succussfully Added" });
    else
      throw new Error("error");
  } catch (err) {
    console.log(err)
  }

})

const slots = asyncHandler(async (req, res) => {

  try {

    const token = req.cookies.jwt
    const details = jwt.decode(token)

    const adminId = req.params.id

    const slots = await Slot.find({ 'admin': adminId })

    res.status(200).json({ slots });
  } catch (err) {
    console.log(err)
  }

})

const mySlots = asyncHandler(async (req, res) => {

  try {
    const token = req.cookies.jwt
    const details = jwt.decode(token)

    const authType = details.user.type
    const authId = details.user.id

    let slots;

    if (authType == "Admin") {
      const admin = authId
      slots = await Slot.find({ admin }).populate({
        path: 'group',
        populate: {
          path: 'project employee2'
        }
      })
    } else if (authType == "Employee") {
      const employee = authId
      const filter = { $or: [{ 'employee2': employee }] }
      const group = await Group.findOne(filter)
      if (group)
        slots = await Slot.find({ group: group._id }).populate('group')

    }
    res.status(200).json({ slots });
  } catch (err) {
    console.log('err', err)
  }

})

const editSlot = asyncHandler(async (req, res) => {

  //slot details
  try {

    const { status, id } = req.body.slot

    //1st employee will be loggedin one
    const token = req.cookies.jwt
    const data = jwt.decode(token)
    const auth = data.user.id

    //request status pending from frontend
    if (status == "pending") {
      //group membrs
      const { valueEmployee2 } = req.body.group

      //project details
      const { title, details } = req.body.project

      //on requesting project, propsal document will be submitted
      const proposal = {
        data: fs.readFileSync((process.cwd() + '/uploads/' + req.file.filename)),
      }

      const project = await Project.create({
        title, details, status: 'proposed', proposal_document: proposal
      });

      if (project) {
        const group = await Group.create({ admin: auth, employee2: valueEmployee2, project: project._id });
        if (group) {
          const slot = await Slot.updateOne({ _id: id },
            { status, isBooked: true, group: group._id })
          if (slot)
            res.status(200).json({ 'message': "Success!" });

        }
      }
    }
    else if (status == "reject") {
      const slot = await Slot.findOne({ _id: id })
      // Find the group
      const group = await Group.findOne({ _id: slot.group });

      if (group) {
        const project = await Project.findOneAndRemove({ _id: group.project })

        // Create a notification for each employee in the group
        const employees = [group.employee2];
        const notifications = [];

        var message = 'Your Project has been rejected.'



        for (const employeeId of employees) {

          const notification = await Notification.create({
            user: employeeId,
            message
          })

        }

        // Delete the group
        await Group.findByIdAndRemove(group._id);
        const slot = await Slot.findOneAndRemove({ _id: id })
        if (slot) {
          res.status(200).json({ 'message': "Success!" });
        }
      }

    }
    else if (status == "accept") {

      const slot = await Slot.findOneAndUpdate({ _id: id },
        { status })

      if (slot) {
        const group = await Group.findOneAndUpdate({ _id: slot.group }, { supervisor: auth })
        if (group) {
          const project = await Project.findOneAndUpdate({ _id: group.project }, { status: "accepted" })


          res.status(200).json({ 'message': "Success!" });

        }
      }
    }

  } catch (err) {
    console.log(err)
  }

})

module.exports = { count, list, add, qualification, addSlot, slots, editSlot, mySlots, slotsCount };

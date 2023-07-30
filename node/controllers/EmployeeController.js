const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel");
const Employee = require("../models/EmployeeModel");
var fs = require('fs');
const ObjectId = require('mongoose').Types.ObjectId;
const type = 'Employee'

const count = asyncHandler(async (req, res) => {

  const employeeCount = await User.find({ type }).count()
  res.status(200).json({ employeeCount });
})

const list = asyncHandler(async (req, res) => {

  try {
    const employees = await User.aggregate([
      {
        $match: {
          type
        }
      },
      {
        $lookup: {
          from: "employees",
          localField: "_id",
          foreignField: "user",
          as: "employee",
        }
      },
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          cover: 1,
          Qualification: { $arrayElemAt: ['$employee.qualification', 0] },
          Interest: { $arrayElemAt: ['$employee.interest', 0] },
          Jobtitle: { $arrayElemAt: ['$employee.jobtitle', 0] }
        }
      }

    ]).sort({ '_id': -1 })

    res.status(200).json({ employees });
  } catch (err) {
    console.log(err)
  }

})

const qualification = asyncHandler(async (req, res) => {

  try {
    const employee = await User.aggregate([
      {
        $match: {
          _id: new ObjectId(req.params.id)
        }
      },
      {
        $lookup: {
          from: "employees",
          localField: "_id",
          foreignField: "user",
          as: "employee",
        }
      },
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          cover: 1,
          Qualification: { $arrayElemAt: ['$employee.qualification', 0] },
          Interest: { $arrayElemAt: ['$employee.interest', 0] },
          Jobtitle: { $arrayElemAt: ['$employee.jobtitle', 0] }
        }
      }
    ])

    res.status(200).json({ 'employee': employee[0] });
  } catch (err) {
    console.log(err)
  }

})

const add = asyncHandler(async (req, res) => {

  const { email, username, password, qualification, interest, jobtitle
  } = req.body

  try {

    const cover = {
      data: fs.readFileSync((process.cwd() + '/uploads/' + req.file.filename)),
      contentType: 'image/jpeg'
    }

    const user = await User.create({
      email, username, password, type, cover, qualification, interest, jobtitle
    });

    if (user) {

      const employee = await Employee.create({
        qualification, 'user': user._id, interest, jobtitle
      });
      if (employee)
        res.status(200).json({ 'message': "Succussfully Added" });

      else
        throw new Error("error");

    } else
      throw new Error("error");
  } catch (e) {
    res.status(500).json({ 'message': 'Email Already Taken' });
  }

})


module.exports = { count, list, add, qualification };

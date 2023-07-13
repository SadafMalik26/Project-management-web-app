
const asyncHandler = require("express-async-handler");

const PendingTask = require("../models/PendingTaskModel");
const jwt = require("jsonwebtoken");

const get = asyncHandler(async (req, res) => {
    const PendingTasks = await PendingTask.find({})
    if(PendingTasks)
    {
      res.status(200).json({PendingTasks});
 
    }
}) 

const add = asyncHandler(async (req, res) => {
try {
    const {title,supervisorname,membersname,description,inyear,url} = req.body
    const pendingtask = await PendingTask.create({
      title,supervisorname,membersname,description,inyear,url
      });
      
      if(pendingtask)
      {
        res.status(200).json({ 'message': "Success!" });

      }
} catch (err) {
    console.log(err)
}
})
  
//delete pendingtask
const deletePendingTask=asyncHandler(async(req,res)=>{
  try {
    const {id}=req.params
   const pendingtask = await PendingTask.findByIdAndRemove(id)
   if(pendingtask) 
   res.json({ 'message': "Deleted!" })
  } catch (err) {
    console.log(err)
  }
})

module.exports = {get,add,deletePendingTask};


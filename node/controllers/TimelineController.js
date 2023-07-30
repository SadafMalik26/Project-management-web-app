const asyncHandler = require("express-async-handler");

const Timeline = require("../models/TimelineModel");

const get = asyncHandler(async (req, res) => {
    try {
        const timelines = await Timeline.find()
        
        
        res.status(200).json({ timelines });
    } catch (err) {
        throw new Error(err);
        
    }
    
})

const add = asyncHandler(async (req, res) => {
    
    try {
        
        
    } catch (err) {
        throw new Error(err);
        
    }
})

const edit = asyncHandler(async (req, res) => {
    
    try {
        const {id,date} = req.body
        const description = req.body.updatedDescription
        const timeline = await Timeline.findByIdAndUpdate(id,{date,description})
        if(timeline)
        res.status(200).json({ 'success':"updated" });
    
} catch (err) {
    throw new Error(err);
}
})


module.exports = { add, get ,edit};
const mongoose = require("mongoose");

const meetingSchema = mongoose.Schema(
    {
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'group',
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        currentDate:{
            type:String
        },
        title:{
            type:String
        },
         description:{
            type:String
        },
        
        attendees: [
            {
                employee: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user',
                    required: true,
                },
                present: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        // Additional meeting fields if needed
    },
    {
        timestamps: true,
    }
    );

    module.exports = mongoose.model("meeting", meetingSchema);
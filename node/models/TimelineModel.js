const mongoose = require("mongoose");

const timelineSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("timeline", timelineSchema);

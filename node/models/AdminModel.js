const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    qualification: {
      type: String,
      required: [true, "Please add Qualification"],
    },
    interest: {
      type: String,
      required: [true, "Please add your interests"],
    },
    jobtitle: {
      type: String,
      required:[true, "Please add your jobtitle"],
    },
    experience: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    phoneno: { 
      type: Number,
      required: true
   
    },
   joiningdate: {
      type: Date,
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);
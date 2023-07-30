const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    qualification: {
      type: String,
      required: [true, "Please add Qualification"],
    },
    interest: {
      type: String,
      required: [true, "Please add your interests"],
    },
    jobtitle:{
      type: String,
      required: [true, "Please add your jobtitle"],
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

module.exports = mongoose.model("Employee", employeeSchema);
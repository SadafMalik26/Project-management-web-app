const mongoose = require("mongoose");

const adminSlotSchema = mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "Please add the admin ID"],
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "group",
      default:null
    },
    isBooked: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: 'none'
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    }
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Slot", adminSlotSchema);

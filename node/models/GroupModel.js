const mongoose = require("mongoose");

const groupSchema = mongoose.Schema(
  {
    employee1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    employee2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: false,

    },
    employee3: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: false,

    },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: false,

    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'project',
      default:null

    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("group", groupSchema);

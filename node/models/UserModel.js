const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
 phone:{
  type: String,
  required: [true, "Please add the user password"],
},

adress:{
  type: String,
  required: [true, "Please add the user password"],
},

date:{
  type: String,
  required: [true, "Please add the user password"],
},

    type: {
      type: String,
      required:[true],
    },
    cover:
    {
        data: Buffer,
        contentType: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);

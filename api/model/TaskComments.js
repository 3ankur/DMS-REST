const mongoose = require("mongoose");
const TaskComments = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true
    },
    user:{
      type: mongoose.Schema.Types.ObjectId, ref: "task",  ref:"AllUserInfo",
      required: true
    },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "task", required: true },
    otherInfo: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("taskcomments",TaskComments);

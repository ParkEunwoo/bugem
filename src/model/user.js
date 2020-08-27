const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: String,
    userId: String,
    userPw: String
  }, 
  { versionKey: "_somethingElse" }
)

module.exports = mongoose.model("user", User);
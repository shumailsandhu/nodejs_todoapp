const mongoose = require("mongoose");
///Scheama For Data Base
const Schema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required:true,
  },
  password: {
    type: String,
    select: false,
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", Schema);

module.exports = User;

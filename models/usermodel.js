const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
      login: String,
      email: String,
      password: String,
      savedLists: Array
    })
  );
  
  module.exports = User;
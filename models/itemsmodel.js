const mongoose = require("mongoose");

const Items = mongoose.model(
    "Items",
    new mongoose.Schema({
      name: String,
      items: Array
    })
  );
  
  module.exports = Items;
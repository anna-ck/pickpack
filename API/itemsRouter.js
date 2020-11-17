const express = require('express');
const itemsRouter = express.Router();
const db = require("../models");

db.mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

const Items = db.items

itemsRouter.get('/', function(req, res) {
    Items.aggregate([
      { "$group": {
        "_id": null,
        "items": { "$push": "$items" }
      }},
      { "$project": {
        "_id": 0,
        "items": {
          "$reduce": {
            "input": "$items",
            "initialValue": [],
            "in": { "$concatArrays": ["$$this", "$$value"] }
          }
        }
      }}], function(err, result) {
        if (err) throw err;
        res.send(result);
      })
  }
  )
  
  itemsRouter.get('/:listName', function(req, res) {
    const listName = req.params.listName
    Items.find({name: listName}, function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  }
  )

  module.exports = itemsRouter;
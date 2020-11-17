const express = require('express');
const userRouter = express.Router();
const db = require("../models");
const { verifyToken } = require('../middlewares');

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

const User = db.user

userRouter.get('/:login', verifyToken)

userRouter.post('/:login', function(req, res) {
  const login = req.params.login
  const listName = req.body.name
  const listContent = req.body.items
  const listId = req.body.id
  User.findOneAndUpdate({login: login}, {$push:{savedLists: {listName: listName, items: listContent, id: listId}}}, {new: true}, (err, obj) => {
    if (err) {
        console.log("Something wrong when updating data!");
        return;
    }
    res.send(obj);
  })
})


userRouter.put('/:login', function(req, res) {
  const login = req.params.login
  const listName = req.body.name
  const listContent = req.body.items
  const listId = req.body.id
  User.findOneAndUpdate({'login': login, 'savedLists.id': listId}, {'$set': {'savedLists.$.items': listContent, 'savedLists.$.listName': listName}}, {new: true}, (err, obj) => {
    if (err) {
        console.log("Something wrong when updating data!");
        return;
    }
    res.send(obj);
  })
})

userRouter.delete('/:login', function(req, res) {
  const login = req.params.login
  const listId = req.body.id
  User.findOneAndUpdate({'login': login}, {'$pull': {'savedLists': {id: listId}}}, {new: true}, (err, obj) => {
    if (err) {
        console.log("Something wrong when updating data!");
        return;
    }
    res.send(obj);
  })
})

module.exports = userRouter;
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");
let corsOptions = {
  origin: "http://localhost:8081"
};

const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
//const saltRounds = 10;
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();
//const mongoose = require("mongoose");
const { checkDuplicateUsernameOrEmail } = require('./middlewares');
const { addNewListToUserAccount, getSavedLists } = require('./middlewares');
const controller = require('./controllers/auth.controller');
//const {addNewListToUserAccount} = require('./middlewares')

//mongoose.set("useFindAndModify", false);
//mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
//console.log("Successfully connect to MongoDB!");
//});

const db = require("./models");

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

//app.listen(port, () => console.log("Server Up and running"));

const User = db.user

/*
const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hashedPassword = sha256.update(password).digest('base64');
    return hashedPassword;
}
*/


const arrayOfPickedItems = [];


/*
app.post('/register', [
  body('name').exists(),
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({error:'data is invalid'});
  }
      const { name, email, password, confirmPassword } = req.body;
      const index = users.findIndex(user => user.email === email)
      if (password !== confirmPassword) {
        return res.status(404).send({error:'passwords are not equal'});
      }
      if (index !== -1) {
        return res.status(404).send({error:'user already exists'});
      }
        const hashedPassword = getHashedPassword(password);
        const newUser = {name: name, email: email, password: hashedPassword}
        users.push(newUser)
        res.send({newUser: newUser, message:'success'})
    })


    app.get('/register', (req, res, next) => {
      res.send(users)
    })
        */

app.get('/picked', (req, res, next) => {
  res.send(arrayOfPickedItems)
})

app.post('/picked', (req, res, next) => {
  const newItem = req.body;
  arrayOfPickedItems.push(newItem)
  res.send(newItem)
})

app.param('itemId', (req, res, next, id) => {
  const itemId = id;
  const itemIndex = arrayOfPickedItems.findIndex(item => item.id === itemId);
  if (itemIndex !== -1){
    req.itemIndex = itemIndex;
    next();
  } else {
    res.status(404);
  }
})

app.put('/picked/:itemId', (req, res, next) => {
  arrayOfPickedItems[req.itemIndex] = req.body;
  res.send(arrayOfPickedItems[req.itemIndex]);
})

app.delete('/picked/:itemId', (req, res, next) => {
  arrayOfPickedItems.splice(req.itemIndex, 1);
  res.status(204).send(arrayOfPickedItems);
})

app.post('/register', checkDuplicateUsernameOrEmail, controller.register)
app.post('/login', controller.login)


app.post('/users/:login', function(req, res) {
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


app.put('/users/:login', function(req, res) {
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

app.get('/users/:login', function(req, res) {
  User.find({login: 'anna'}, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
}
)

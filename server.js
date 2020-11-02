const express = require('express');
const path = require('path');
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
const dotenv = require('dotenv');
dotenv.config();
const { checkDuplicates, verifyToken } = require('./middlewares');
const controller = require('./controllers/auth.controller');

const db = require("./models");

app.use(express.static(path.join(__dirname, 'client/build')));


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
const Items = db.items

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.post('/register', checkDuplicates, controller.register)
app.post('/login', controller.login)

app.get('/users/:login', verifyToken)

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

app.delete('/users/:login', function(req, res) {
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

app.get('/items', function(req, res) {
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

app.get('/items/:listName', function(req, res) {
  const listName = req.params.listName
  Items.find({name: listName}, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
}
)

// An api endpoint that returns a short list of items

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

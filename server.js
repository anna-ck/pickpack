const express = require('express');
require('dotenv').config()
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const { checkDuplicates } = require('./middlewares');
const controller = require('./controllers/auth.controller');
const db = require("./models");
const userRouter = require("./API/userRouter")
const itemsRouter = require("./API/itemsRouter")
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

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.post('/register', checkDuplicates, controller.register)
app.post('/login', controller.login)
app.use('/users', userRouter);
app.use('/items', itemsRouter);

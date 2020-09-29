const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const { body, validationResult } = require('express-validator');
//const bcrypt = require('bcrypt');
//const saltRounds = 10;
const crypto = require('crypto');


const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hashedPassword = sha256.update(password).digest('base64');
    return hashedPassword;
}


const arrayOfPickedItems = [];
const users = [
  {email: 'example@example.com',
  password: 'secret'}
];

app.post('/register', [
  body('name').exists(),
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({message:'data is invalid', error: errors});
  }
      const { name, email, password, confirmPassword } = req.body;
      const index = users.findIndex(user => user.email === email)
      if (password !== confirmPassword) {
        return res.status(404).send({message:'passwords are not equal'});
      }
      if (index !== -1) {
        return res.status(404).send({message:'user already exists'});
      }
        const hashedPassword = getHashedPassword(password);
        const newUser = {email: email, password: hashedPassword}
        users.push(newUser)
        res.send({newUser: newUser, message:'success'})
    })

    app.get('/register', (req, res, next) => {
      res.send(users)
    })

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


app.listen(port, () => console.log(`Listening on port ${port}`));
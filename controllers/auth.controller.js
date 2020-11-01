const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

register = (req, res) => {
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const login = req.body.login;
  const email = req.body.email;
  if (password === confirmPassword) {
    if (login.length >= 5) {
      let regex = /\S+@\S+\.\S+/;
      if (regex.test(email)) {
        if (password.length >= 5) {
    const user = new User({
      login: req.body.login,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "You have been successfully registered!" });
    })
  }
  else {
    res.status(500).send({ message: 'Your password must be at least 5 characters long' });
  }
}
  else {
    res.status(500).send({ message: "Invalid email address!" });
  }
}
  else {
    res.status(500).send({ message: "Your login must be at least 5 characters long" });
  }
}
  else {
    res.status(500).send({ message: 'Provided passwords are not identical' });
    return
  }
}

login = (req, res) => {
    User.findOne({
      login: req.body.login
    })
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        let token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 
        });
  
        res.status(200).send({
          id: user._id,
          login: user.login,
          email: user.email,
          accessToken: token,
          savedLists: user.savedLists
        });
      });
  };

module.exports = {login, register}
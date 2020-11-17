const jwt = require("jsonwebtoken");
require('dotenv').config()
const config = process.env.SECRET;
const db = require("../models");
const User = db.user;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, config, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      else {
        res.send({message: 'Token is valid'})
      }
      next();
    });
  }

  module.exports = verifyToken
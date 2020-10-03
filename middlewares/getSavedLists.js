const db = require("../models");
const User = db.user;

getSavedLists = (req, res) => {
    User.findOne({}, function(err, result) {
        if (err) throw err;
        res.send(result);
      });
      
}
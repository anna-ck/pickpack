const db = require("../models");
const User = db.user;

addNewListToUserAccount = (req, res) => {
    //const login = req.params.login
    //const newList = req.params.newList
    User.update({login: 'anna'}, {$set:{myLists: 'abc'}}, {new: true}, (err, obj) => {
        console.log('aaaa')
        if (err) {
            console.log("Something wrong when updating data!");
            return;
        }
        res.send(obj);
    })
}

module.exports = addNewListToUserAccount
var path = require('path');
var fs = require('fs');
var express = require('express');
var router = express.Router();

router.use('/naruto', function(req, res) {
  res.send('this is the req to naruto');
});

router.use('/onepiece', function(req, res){
  res.send('this is the req to onepiece');
});

router.post('/createAccount', function(req, res){
  // you can add some validate before save
  var newUser = {Email3: {account: req.body.account, password: req.body.password}};
  // first should read json file as an object
  // second add new user message to the object
  // third wirite the object into json file
  // only do this way can keep correct json file
  var users = require('../Resources/email.json')
  var newUsers = Object.assign({}, users, newUser)
  var jsonPath = path.resolve(__dirname, '../Resources/email.json')
  fs.writeFile(jsonPath, JSON.stringify(newUsers, null, 4), (err) => {
    if (err) throw err;
    res.send('add user success! now users are: \n' + JSON.stringify(require('../Resources/email.json')))
  })
});

module.exports = router;

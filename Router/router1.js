var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use('/naruto', function(req, res) {
  res.send('this is the req to naruto');
});

router.use('/onepiece', function(req, res){
  res.send('this is the req to onepiece');
});

router.post('/createAccount', urlencodedParser, function(req, res){
  var newUser = {Email3: {account: req.body.account, password: req.body.password}};
  fs.appendFile('./Resources/email.json', JSON.stringify(newUser), function(err, data){
    if (err)
      throw err;

    res.send(JSON.stringify());
  });
});

module.exports = router;

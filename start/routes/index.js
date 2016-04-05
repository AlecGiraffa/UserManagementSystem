var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.json({message : 'welcome to Client Management System'});
});





module.exports = router;

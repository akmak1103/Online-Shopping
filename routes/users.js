var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/akshay', function(req, res, next) {
  res.send('Welcome Akshay! Hope you are doing good today!!');
});

module.exports = router;

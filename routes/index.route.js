var express = require ('express');
var router = express.Router ();
var http = require ('http');

/* GET home page. */
router.get ('/', function (req, res, next) {
  res.render ('index', {title: 'Online Shopping', name: 'Akshay'});
});

router.post ('/', function (req, res, next) {
  console.log (req.body.email);
  console.log (req.body.password);

  const data = JSON.stringify ({
    email: req.body.email,
    password: req.body.password,
  });

  const options = {
    hostname: req.hostname,
    port: 3000,
    path: '/users/signin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  };

  const httpReq = http.request (options, httpRes => {
    console.log ('StatusCode: $(httpRes.statusCode)');

    var buff = '';
    httpRes.on ('data', chunks => {
      buff += chunks;
    });

    httpRes.on ('end', () => {
      res.render ('dashboard', JSON.parse (buff));
    });
  });

  httpReq.on ('error', error => {
    console.error (error);
  });
  httpReq.write (data);
  httpReq.end ();
});

module.exports = router;

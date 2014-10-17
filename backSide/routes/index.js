var express = require('express');
var User = require('./../modules/user');
var Me = require('./../modules/me');
var Circul = require('./../modules/circul');
var Follow = require('./../modules/follow');
var router = express.Router();

/* GET home interface. */
router.get('/', function(req, res) {
  res.send('<h1>Hello World</h1>');
});
/* GET personal interface.*/
router.get('/users/:id', function(req, res) {
  var user = new User();
  user.load(req.params.id, function (err) {
  	if (err) throw err;
  	console.log('here is user :',user);
    res.send(user);
  });
});
/* GET me inteface*/
router.get('/me/:id', function(req, res) {
  var me = new Me();
  me.load(req.params.id, function (err) {
  	if (err) throw err;
  	console.log('me query over.',me);
    res.send(me);
  });
});

router.post('/saveme', function(req, res) {
  var me = new Me();
  me.update(req.body, function (err) {
    if (err) throw err;
    console.log('me update over',req.body);
    res.send("success");
  });
});

/* GET Circul inteface*/
router.get('/circul/:id', function(req, res) {
  var circul = new Circul();
  circul.load(req.params.id, function (err) {
    if (err) throw err;
    console.log('circul query over.',circul.result);
    res.send(circul.result);
  });
});

router.post('/insert', function(req, res) {
  var circul = new Circul();
  // circul.insert(req.body.id, req.body.talk, function (err) {
  circul.insert(req.body, function (err) {
    if (err) throw err;
    console.log('says insert over.', req.body);
    res.send("success");
  });
});

/* GET Follow inteface*/
router.get('/follow/:id', function(req, res) {
  var follow = new Follow();
  follow.load(req.params.id, function (err, result) {
    if (err) throw err;
    //first sign in
    if(result[0] != null) {
      console.log('follow query over.',result);
      res.send(result);
    }
    if(result[0] == null || req.params.pa == 'recommend') {
      console.log('follow recomend pa',req.params.pa);
      console.log('follow recomend query',result);
      follow.firstLoad(req.params.id, function(err, answer) {
        console.log('follow recomend query over.',answer);
        res.send(answer);
      });
    }
  });
});

router.post('/followupdate', function(req, res) {
  var follow = new Follow();
  follow.update(req.body, function (err, rows) {
    if (err) throw err;
    if(rows == 0)
      follow.insert(req.body, function(err) {
        console.log('follow insert over.',req.body.id);
        res.send("success");
      });
    else {
      console.log('follow update over.',req.body.id);
      res.send("success");
    }
  });
});


module.exports = router;

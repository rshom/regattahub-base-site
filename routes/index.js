var express = require('express');

var mailAuth = require('../config/mailAuth');
var nodemailer = require('nodemailer');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var boat_class= 'All';
    var region= 'Worldwide';
    res.render('index', {boat_class: boat_class, region: region});
});
router.get('/:region/', function(req, res, next) {
    var boat_class= "All";
    var region=req.params.region;
    res.render('index', {boat_class: boat_class, region: region});
});
router.get('/:region/:boat_class/', function(req, res, next) {
    var boat_class=req.params.boat_class;
    var region=req.params.region;
    res.render('index', {boat_class: boat_class, region: region});
});

router.get('/post/:region/:boat_class/', function(req,res,next) {
    var boat_class=req.params.boat_class;
    //var region=req.params.region;
    var region= "sandbox";
    // right now, the sandbox is the only region that exists for testing
    res.render('post', {boat_class: boat_class, region: region});
});

router.post('/post/preview/', function(req,res,next) {
    
    var inputs=req.body;
    res.render('preview',{ inputs: inputs });
});

router.post('/post/publish', function(req,res,next) {
    var transporter = nodemailer.createTransport(mailAuth);
    var data = req.body.data;
    var text = "hello world from regattahub.com";
    var mailOptions = {
	from: mailAuth.auth.user,
	to: data.email,
	subject: "RegattaHub automail test",
	text: text
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error,info){
	if(error){
	    console.log(error);
	    res.json({yo: 'error'});
	} else {
	    console.log('Message sent :' + info.response);
	    res.json({yo: info.response});
	};
    });


});

router.get('/manage/:id/:key/', function(req,res,next) {
    console.log('looking for saved results: ', req.params.id);
    console.log('checking key: ', req.params.key);
    res.render('index');
});

module.exports = router;


// move these somewhere else as a module

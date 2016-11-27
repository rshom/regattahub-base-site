var express = require('express');

var mailAuth = require('../config/mailAuth');
var nodemailer = require('nodemailer');

var router = express.Router();

router.get('/:region/:boat_class/', function(req,res,next) {
    var boat_class=req.params.boat_class;
    //var region=req.params.region;
    var region= "sandbox";
    // right now, the sandbox is the only region that exists for testing
    res.render('post', {boat_class: boat_class, region: region});
});

router.post('/preview/', function(req,res,next) {
    var inputs=req.body;
    res.render('preview',{ inputs: inputs });
});

router.post('/publish',function(req,res) {
    console.log("hello");
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
	    res.send({state:"error"});
	} else {
	    console.log('Message sent :' + info.response);
	    res.send({state:"success"});
	};
    });
});

router.get('/thankyou', function(req, res){
    console.log("thanks");
    res.render('post_thankyou');
});
router.get('/error', function(req,res){
    console.log("error");
    res.render('post_error');
});

module.exports = router;



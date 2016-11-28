var express = require('express');
var mongoose = require('mongoose');
var Regatta = mongoose.model('Regatta');
var mailAuth = require('../config/mailAuth');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var randomstring = require('randomstring');

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
    // I can definitely modularize this more
    // set publish to unpublished
    console.log('publishing')
    var regatta = new Regatta();
    console.log(regatta);
    regatta.name = 'test';
    regatta.created_by = 'Russ';
    var passkey = randomstring.generate(7);
    bcrypt.hash(passkey,10,function(err,hash){
	regatta.passkey = hash;
    console.log(regatta);

    // save it to the database
    regatta.save(function(err){
	if (err)
	    console.log('Didnt save: ' + err);
    });
    console.log('saved');
    
    // send an email with id and key to the user
    var transporter = nodemailer.createTransport(mailAuth);
    var data = req.body.data;
    var text = regatta._id+" "+passkey;
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




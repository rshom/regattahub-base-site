var express = require('express');
var mongoose = require('mongoose');
var Regatta = mongoose.model('Regatta');
var mailAuth = require('../config/mailAuth');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var randomstring = require('randomstring');
var router = express.Router();

var multer = require('multer');
var upload = multer({
    storage: multer.memoryStorage({})
});



router.get('/', function(req,res,next) {
    //var region=req.params.region;
    // right now, the sandbox is the only region that exists for testing
    res.render('post');
});

router.post('/submit',function(req,res) {
    // I can definitely modularize this more
    // set publish to unpublished
    console.log(req.body);
    var input = req.body;
    if (!validate_data(input)){
	res.redirect("/error");
	// I should probably log these errors
	//as it could be someone fucking with my system
    };
    
    
    var regatta = new Regatta();
    regatta.event_name = input.name
    regatta.created_by = input.email;
    regatta.event_host = input.host;
    regatta.event_location.city = input.city;
    regatta.event_location.state = input.state;
    regatta.event_location.country = input.country;
    regatta.descript = input.description;
    regatta.event_date = input.date;
    regatta.boat_class = input.boat_class;
    var passkey = randomstring.generate(7);
    bcrypt.hash(passkey,10,function(err,hash){
	regatta.passkey = hash;
	console.log(regatta);
	
	// save it to the database
	regatta.save(function(err){
	    if (err)
		console.log('Didnt save: ' + err);
	});
	
	// send an email with id and key to the user
	var transporter = nodemailer.createTransport(mailAuth);
	
	var text = "http://regattahub.com/manage/"+regatta._id+"/"+passkey;
	var mailOptions = {
	    from: mailAuth.auth.user,
	    to: regatta.created_by,
	    subject: "POST/EDIT/DELETE "+regatta.name,
	    text: text
	};
    console.log(mailOptions);
	transporter.sendMail(mailOptions, function(error,info){
	    if(error){
		res.redirect('/post/error');
	    } else {
		console.log('Message sent :' + info.response);
		res.redirect('/post/thankyou');
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

function validate_data(regatta){
    return true;
}


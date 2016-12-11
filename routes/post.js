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



router.get('/', function(req,res) {
    res.render('post');
});

router.post('/', function(req,res) {
    var class_list = [];
    regatta = new Regatta();
    for (key in req.body) {
	if (key.substr(0,6)=="class-") {
	    class_list.push(key.slice(6));
	} else {
	    regatta[key]=req.body[key];
	}
    }
    regatta.class_list = class_list;
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
	console.log(text);
	var mailOptions = {
	    from: mailAuth.auth.user,
	    to: regatta.created_by,
	    subject: "POST/EDIT/DELETE "+regatta.event_name,
	    text: text
	};
    console.log(mailOptions);
	transporter.sendMail(mailOptions, function(error,info){
	    if(error){
		console.log(error)
		res.redirect('/post/error');
	    } else {
		console.log('Message sent :' + info.response);
		res.redirect('/post/thankyou');
	};
	});
    });
});

router.post('/class', function(req,res) {
    res.send('todo make class page');
});

router.post('/description', function(req,res) {
    res.send('todo make description page');
});

router.post('/submit',function(req,res) {
    // I can definitely modularize this more
    // set publish to unpublished
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
    regatta.event_description = input.event_description;
    regatta.registration_site = input.registration_site;
    regatta.event_date = input.date;
    regatta.boat_class=req.body.boat_class.replace(/[\s`~!@#$%^&*()_|+\-=?;:'".<>\{\}\[\]\\\/]+/g,'').toLowerCase().split(',');

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
	    subject: "POST/EDIT/DELETE "+regatta.event_name,
	    text: text
	};
    console.log(mailOptions);
	transporter.sendMail(mailOptions, function(error,info){
	    if(error){
		console.log(error)
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


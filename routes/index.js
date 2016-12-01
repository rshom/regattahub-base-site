var express = require('express');

var mailAuth = require('../config/mailAuth');
var nodemailer = require('nodemailer');

var mongoose = require('mongoose');
var Regatta = mongoose.model('Regatta');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //Regatta.find({published: true},function(err,regattas){
    Regatta.find(function(err,regattas){
	if (err)
	    console.log(err);

	console.log(regattas);
	res.render('index', {regattas: regattas});

    });
});

// about page

// contact page



module.exports = router;


// move these somewhere else as a module

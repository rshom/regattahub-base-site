var express = require('express');

var mailAuth = require('../config/mailAuth');
var nodemailer = require('nodemailer');

var mongoose = require('mongoose');
var Regatta = mongoose.model('Regatta');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // figure out todays date
    var today = new Date();
    var thisYear = today.getFullYear()
    var thisMonth = today.getMonth()
    var endDate = new Date(thisYear,thisMonth+1,1);
    var startDate = new Date(thisYear,thisMonth,1);
    Regatta.find({event_date:{ $gte: startDate, $lt: endDate }},function(err,regattas){
	if (err)
	    console.log(err);
	res.render('index', {regattas: regattas, timeline: 'now', boat_class:''});

    });
});
router.get('/now', function(req, res, next) {
    // figure out todays date
    var today = new Date();
    var thisYear = today.getFullYear()
    var thisMonth = today.getMonth()
    var endDate = new Date(thisYear,thisMonth+1,1);
    var startDate = new Date(thisYear,thisMonth,1);
    Regatta.find({event_date:{ $gte: startDate, $lt: endDate }},function(err,regattas){
	if (err)
	    console.log(err);

	res.render('index', {regattas: regattas, timeline: 'now', boat_class:''});

    });
});

router.get('/now/:boat_class', function(req, res, next) {
    // figure out todays date
    var today = new Date();
    var thisYear = today.getFullYear()
    var thisMonth = today.getMonth()
    var endDate = new Date(thisYear,thisMonth+1,1);
    var startDate = new Date(thisYear,thisMonth,1);
    Regatta.find({event_date:{ $gte: startDate, $lt: endDate }, class_list: req.params.boat_class.replace('_',' ')},function(err,regattas){
	if (err)
	    console.log(err);

	res.render('index', {regattas: regattas, timeline: 'now', boat_class:req.params.boat_class.replace('_',' ')});

    });
});

router.get('/future', function(req, res, next) {
    // figure out today's date
    var today = new Date();
    // grab all regattas in the future
    Regatta.find({event_date:{ $gt: today} },function(err,regattas){
	if (err)
	    console.log(err);

	res.render('index', {regattas: regattas, timeline: 'future', boat_class:''});

    });

});

router.get('/recent', function(req, res, next) {
    // figure out today's date
    var today = new Date();
    // grab all regattas in the past
    Regatta.find({event_date:{ $lt: today} },function(err,regattas){
	if (err)
	    console.log(err);

	res.render('index', {regattas: regattas, timeline: 'recent', boat_class:''});
    });

});

router.get('/future/:boat_class', function(req, res, next) {
    // figure out today's date
    var today = new Date();
    // grab all regattas in the future
    Regatta.find({published: true, event_date: {$gte: today}, class_list: req.params.boat_class },function(err,regattas){
	if (err)
	    console.log(err);

	
	res.render('index', {regattas: regattas, timeline: 'future', boat_class:req.params.boat_class});
    });

});

router.get('/recent/:boat_class', function(req, res, next) {
    // figure out today's date
    var today = new Date();
    // grab all regattas in the past
    Regatta.find({event_date:{ $lte: today}, class_list: req.params.boat_class },function(err,regattas){
	if (err)
	    console.log(err);

	res.render('index', {regattas: regattas, timeline: 'recent', boat_class:req.params.boat_class});
    });

});



// about page
router.get('/about', function(req, res, next) {
    res.render('about');
});

// contact page
router.get('/contact', function(req, res, next) {
    res.render('contact');
});




module.exports = router;


// move these somewhere else as a module

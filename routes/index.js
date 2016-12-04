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
    var thisYear = today.getYear()
    var thisMonth = today.getMonth()
    var endDate = new Date(thisYear,thisMonth+1,1);
    var startDate = new Date(thisYear,thisMonth,1);
    Regatta.find({published: true, event_date:{ $gte: startDate, $lt: endDate }},function(err,regattas){
	if (err)
	    console.log(err);

	res.render('index', {regattas: regattas, timeline: 'now', boat_class:'all'});

    });
});
router.get('/now', function(req, res, next) {
    // figure out todays date
    var today = new Date();
    var thisYear = today.getYear()
    var thisMonth = today.getMonth()
    var endDate = new Date(thisYear,thisMonth+1,1);
    var startDate = new Date(thisYear,thisMonth,1);
    Regatta.find({published: true, event_date:{ $gte: startDate, $lt: endDate }},function(err,regattas){
	if (err)
	    console.log(err);

	res.render('index', {regattas: regattas, timeline: 'now', boat_class:'all'});

    });
});

router.get('/now/:boat_class', function(req, res, next) {
    // figure out todays date
    var today = new Date();
    var thisYear = today.getYear()
    var thisMonth = today.getMonth()
    var endDate = new Date(thisYear,thisMonth+1,1);
    var startDate = new Date(thisYear,thisMonth,1);
    Regatta.find({published: true, event_date:{ $gte: startDate, $lt: endDate }, boat_class: req.params.boat_class},function(err,regattas){
	if (err)
	    console.log(err);

	res.render('index', {regattas: regattas, timeline: 'now', boat_class:req.params.boat_class});

    });
});

router.get('/future', function(req, res, next) {
    // figure out today's date
    var today = new Date();
    // grab all regattas in the future
    Regatta.find({published: true, event_date:{ $gt: today} },function(err,regattas){
	if (err)
	    console.log(err);

	res.render('index', {regattas: regattas, timeline: 'future', boat_class:'all'});

    });

});

router.get('/recent', function(req, res, next) {
    // figure out today's date
    var today = new Date();
    // grab all regattas in the past
    Regatta.find({published: true, event_date:{ $lt: today} },function(err,regattas){
	if (err)
	    console.log(err);

	res.render('index', {regattas: regattas, timeline: 'recent', boat_class:'all'});
    });

});
/*
router.get('/future/:boat_class', function(req, res, next) {
    // figure out today's date
    var today = new Date();
    // grab all regattas in the future
    Regatta.find({published: true, event_date:{ $gt: today}, boat_class: req.params.boat_class },function(err,regattas){
	if (err)
	    console.log(err);


	res.render('index', {regattas: regattas, timeline: 'future', boat_class:req.params.boat_class});
    });

});

router.get('/recent/:boat_class', function(req, res, next) {
    // figure out today's date
    var today = new Date();
    // grab all regattas in the past
    Regatta.find({published: true, event_date:{ $lt: today}, boat_class: req.params.boat_class },function(err,regattas){
	if (err)
	    console.log(err);

	res.render('index', {regattas: regattas, timeline: 'recent', boat_class:req.params.boat_class});
    });

});
*/
// about page

// contact page



module.exports = router;


// move these somewhere else as a module

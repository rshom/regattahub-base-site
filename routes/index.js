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



router.get('/manage/:id/:key/', function(req,res,next) {
    console.log('looking for saved results: ', req.params.id);
    console.log('checking key: ', req.params.key);
    res.render('index');
});

router.get('/results/:region/', function(req, res, next) {
    var boat_class= "All";
    var region=req.params.region;
    res.render('index', {boat_class: boat_class, region: region});
});
router.get('/results/:region/:boat_class/', function(req, res, next) {
    var boat_class=req.params.boat_class;
    var region=req.params.region;
    res.render('index', {boat_class: boat_class, region: region});
});

module.exports = router;


// move these somewhere else as a module

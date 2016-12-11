var express = require('express');
var mongoose = require('mongoose');
var Club = mongoose.model('Club');
var Regatta = mongoose.model('Regatta');
var bcrypt = require('bcrypt');


var router = express.Router();

router.get('/', function(req,res) {
    res.send('Try the link sent to your email');
});


router.post('/', function(req,res) {
    res.send('Sorry, posting to regattahub is currently by invite only. Email russ@regattahub.com if you would like to get involved.');
});

router.get('/:id/:key', function(req,res,next) {
    Regatta.findOne({_id:req.params.id}, function(err, regatta){
	if (err)
	    res.redirect('/manage');
	if (!bcrypt.compareSync(req.params.key, regatta.passkey))
	    res.redirect('/manage');

	res.render('manage_regatta',{regatta:regatta, key:req.params.key});

    });
});

router.post('/:id/:key/publish', function(req,res,next) {
    Regatta.findOne({_id:req.params.id}, function(err,regatta){
	if (err)
	    res.redirect('/post/error');
	if (!bcrypt.compareSync(req.params.key, regatta.passkey))
	    res.redirect('/post/error');

	regatta.published=true;
	regatta.save();
	res.redirect('/manage/'+req.params.id+'/'+req.params.key);
    });
});

router.post('/:id/:key/basic', function(req,res,next) {
    Regatta.findOne({_id:req.params.id}, function(err,regatta){
	if (err)
	    res.redirect('/post/error');
	if (!bcrypt.compareSync(req.params.key, regatta.passkey))
	    res.redirect('/post/error');

	// validated, lets update
	regatta.event_name=req.body.event_name;
	regatta.event_date=req.body.event_date;
	regatta.host_id=req.body.host_id;
	regatta.event_description=req.body.event_description;
	regatta.registration_link=req.body.registration_link;
	regatta.save();
	res.redirect('/manage/'+req.params.id+'/'+req.params.key);
    });
});

router.post('/:id/:key/location', function(req,res,next) {
    Regatta.findOne({_id:req.params.id}, function(err,regatta){
	if (err)
	    res.redirect('/post/error');
	if (!bcrypt.compareSync(req.params.key, regatta.passkey))
	    res.redirect('/post/error');

	// validated, lets update
	regatta.event_location.street=req.body.address_street;
	regatta.event_location.city=req.body.address_city;
	regatta.event_location.state=req.body.address_state;
	regatta.event_location.country=req.body.address_country;
	regatta.event_location.lat=req.body.address_lat;
	regatta.event_location.lng=req.body.address_lng;

	regatta.save();
	res.redirect('/manage/'+req.params.id+'/'+req.params.key);
    });
});
router.post('/:id/:key/class_list', function(req,res,next) {
    Regatta.findOne({_id:req.params.id}, function(err,regatta){
	if (err)
	    res.redirect('/post/error');
	if (!bcrypt.compareSync(req.params.key, regatta.passkey))
	    res.redirect('/post/error');

	var class_list = [];
	    for (key in req.body) {
		if (key.substr(0,6)=="class-") {
		    class_list.push(key.slice(6));
		} else {
		    regatta[key]=req.body[key];
		}
	    }
	regatta.class_list = class_list;
	regatta.save()
	res.redirect('/manage/'+req.params.id+'/'+req.params.key);

    });
});
router.post('/:id/:key/schedule', function(req,res,next) {
    res.send('todo update schedule info')
});

router.post('/:id/:key/sailing_rules', function(req,res,next) {
    res.send('todo update sailing rules')
});

router.post('/:id/:key/results', function(req,res,next) {
    res.send('todo update results')
});
router.post('/:id/:key/pictures', function(req,res,next) {
    res.send('todo update pictures')
});
router.post('/:id/:key/social_media', function(req,res,next) {
    res.send('todo update social media info')
});


module.exports = router;




var express = require('express');
var mongoose = require('mongoose');
var Regatta = mongoose.model('Regatta');
var bcrypt = require('bcrypt');


var router = express.Router();

router.get('/:id/:key/', function(req,res,next) {
    Regatta.findOne({'_id':req.params.id}, function (err, regatta) {
	if (err)
	    res.redirect('/post/error');
	if (!bcrypt.compareSync(req.params.key, regatta.passkey))
		res.redirect('/post/error');

	res.render('manage',{regatta:regatta, key:req.params.key});
    });
});


module.exports = router;




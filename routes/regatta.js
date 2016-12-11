var express = require('express');
var mongoose = require('mongoose');
var Regatta = mongoose.model('Regatta');
var bcrypt = require('bcrypt');


var router = express.Router();
router.get('/:id', function(req, res, next) {
    Regatta.findOne({'_id':req.params.id}, function(err, regatta){
	res.render('regatta', {regatta: regatta});
    });
});


module.exports = router;




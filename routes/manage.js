var express = require('express');
var mongoose = require('mongoose');
var Regatta = mongoose.model('Regatta');
var bcrypt = require('bcrypt');


var router = express.Router();

router.get('/:regatta/:key/', function(req,res,next) {
    console.log('looking for saved results: ', req.params.id);
    console.log('checking key: ', req.params.key);
    res.send('todo: make page');
});


module.exports = router;




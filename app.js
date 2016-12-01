// require dependencies
var express = require('express'); // http server
var path = require('path'); 
var favicon = require('serve-favicon');
var logger = require('morgan'); // logger for development
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); // read inside of http requests
var mongoose = require('mongoose'); // connection to mongoDB

// initialize mongoose schemas
require('./models/models');
// Regatta, Sailor, Club

// set up multer
var multer = require('multer');
/// used for parsing multi-part forms that have attachments

// require routes
var index = require('./routes/index');
var postRoute = require('./routes/post');
var resultsRoute = require('./routes/results');
var manageRoute = require('./routes/manage');



var app = express();

// connect to mongoose
// change to AWS
//var mongoConfig = require('./config/mongo');
mongoose.connect('mongodb://127.0.0.1/test');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // only use logger in the dev environment
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/post',postRoute);
app.use('/results',resultsRoute);
app.use('/manage',manageRoute);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');


var app = express();


app.use(flash());

app.use(session({
  secret: "vdfgbfvdvfgbhnbggfv32566",
  resave:false,
  saveUninitialized:true
}));


var indexRouter = require('./routes/index');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//app.use(expressValidator());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(path.join(__dirname, 'public'))); //app.use(express.static("public"));
app.use('/', indexRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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



//module.exports = con;
module.exports = app;
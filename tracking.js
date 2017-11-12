const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const cookieParser = require('cookie-parser');
var passport = require("passport");

// create express app 
var app = express();
app.use(passport.initialize());

// set up the view engine
app.set("views", path.resolve(__dirname, "views")); // path to views
app.set("view engine", "ejs"); // specify our view engine

// specify various resources and apply them to our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/tracking_assets/'));  // works for views in root view folder


// Request to this URI will be handled by this CONTROLLER..........
app.use('/', require('./controllers/home'));
app.use('/login', require('./controllers/login'));
app.use('/signup', require('./controllers/signup'));
app.use('/user', require('./controllers/user'));


// handle page not found errors
app.use(function (request, response) {
  response.status(404).render("404.ejs");
});

// set port 
app.set('port',(process.env.PORT || 4001));
app.listen(app.set('port'), function(){
  console.log('Server started art port: ' + app.get('port'));
});
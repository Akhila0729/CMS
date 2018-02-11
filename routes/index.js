var express = require('express'),
	Parse   = require("parse/node"),
	passport = require('passport'),
	router = express.Router();
	Backendless = require("backendless");

var userSession;
// This method is called on launch of the application.
router.get('/', function (req, res) {
    res.render('index', { title: 'childrenmonitor'});
});

router.get('/register', function (req, res) {
    res.render('signup', {title: 'Signup'});
});

router.post('/register', function (req, res) {
	function userRegistered(user){
		//Hooray! Let them use the app now.
		req.flash("success","successfully signed up...explore our application");
		res.redirect("/login");   
	}
	function gotError(error){
		 // Show the error message somewhere and let the user try again.
		 req.flash("error",error.code + " : " + error.message);
		 res.redirect("back");
	}
	var user = new Backendless.User();
	user.username = req.body.user["username"];
	user.password = req.body.user["password"];
	user.email = req.body.user["email"];
	user.gender = req.body.user["gender"];
	user.firstName = req.body.user["fname"];
	user.lastName = req.body.user["lname"];
	user.address = req.body.user["address"];
	user.phone = req.body.user["phone"];
	Backendless.UserService.register(user).then(userRegistered).catch(gotError);    
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.get('/userpage', function (req, res) {
    res.render('userpage');
});

router.get('/profile', function (req, res) {
    res.render('profile');
});

router.get('/settings', function (req, res) {
    res.render('settings');
});

router.get('/record', function (req, res) {
    res.render('record');
});

router.get('/alert', function (req, res) {
    res.render('alert');
});

router.get('/about', function (req, res) {
    res.render('about');
});



router.post("/login",function(req,res){
		function userLoggedIn(user){
			res.redirect("/welcome");
		}
		function gotError(error){
			console.log( "error message - " + error.message );
			console.log( "error code - " + error.statusCode );
			res.redirect("/login");
		}
		Backendless.UserService.login(req.body.emailID, req.body.password, false)
		.then (userLoggedIn).catch(gotError);
});

router.get('/logout', function (req, res) {
	function userLoggedOut(){
		req.flash("success","successfully logged out");
		res.redirect("/");
	}
	function gotError(error){
		console.log( "error message - " + error.message );
		console.log( "erroror code - " + error.statusCode );
	}
	Backendless.UserService.logout().then(userLoggedOut).catch(gotError);
});

router.get("/forgotPassword",function(req,res){
	res.render("forgotpassword")
});

router.post("/forgotPassword",function(req,res){
	function passwordRecoverySent(){
		req.flash("success","Password reset link was emailed to your registered email");
		res.redirect("/");	
	}
	function gotError(error){
		req.flash("error","email was wrong or not found in our system");
		res.redirect("back");
	}
	Backendless.UserService.restorePassword(req.body.emailID).then(passwordRecoverySent).catch(gotError);
});
 
module.exports = router;
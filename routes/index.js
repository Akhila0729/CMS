var express = require('express'),
	Parse   = require("parse/node"),
	passport = require('passport'),
    router = express.Router();

var userSession;
// This method is called on launch of the application.
router.get('/', function (req, res) {
    res.render('index', { title: 'childrenmonitor'});
});

router.get('/register', function (req, res) {
    res.render('signup', {title: 'Signup'});
});

router.post('/register', function (req, res) {
    var user = new Parse.User();
    user.set("username", req.body.user["username"]);
	user.set("password", req.body.user["password"]);
	user.set("email", req.body.user["email"]);
	user.set("gender", req.body.user["gender"]);
	user.set("firstName", req.body.user["fname"]);
	user.set("lastName", req.body.user["lname"]);
	user.set("address", req.body.user["address"]);
	user.set("phone",req.body.user["phone"]);
	user.signUp(null, {
	    success: function(result) {
	      //Hooray! Let them use the app now.
	      req.flash("success","successfully signed up...explore our application");
	      res.redirect("/login");   
	    },
	    error: function(user, error) {
	      // Show the error message somewhere and let the user try again.
	      req.flash("error",error.code + " : " + error.message);
	      res.redirect("back");
	    }
	});
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.post("/login",passport.authenticate('parse',{
	successRedirect: "/welcome",
	failureRedirect: "/login"
	}),function(req,res){
});

router.get('/logout', function (req, res) {
	req.logout();
	req.flash("success","successfully logged out");
	res.redirect("/");
});
 
module.exports = router;
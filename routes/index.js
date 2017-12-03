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

router.post('/login',function(req,res){
	Parse.User.logIn(req.body.username,req.body.password,{
		success: function(user) {
		    passport.authenticate('parse',function(err, user, info) {
			    if (err) {
			    	return res.status(400).json({payload : {error: info}, message : info.message});
			 	}

				if (!user) { 
				   	return res.status(400).json({payload : {error: info}, message : info.message});
				}

				req.logIn(user, function(err) {
					   	if (err) {
					   		return res.status(400).json({payload : {error: err}, message : info.message});
						}
					 	res.render("user");
						return res.json({
					   		payload : req.user,
					   		message : "Authentication successfull"
					   	});
					});
				})(req,res);
		},
	    error: function(user, error) {
			// The login failed. Check error to see why.
			req.flash("error",error);
			res.redirect("back");
		}
	});
});

router.get('/logout', function (req, res) {
});
 
module.exports = router;
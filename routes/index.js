var express = require('express'),
	Parse = require("parse/node"),
	passport = require('passport'),
	router = express.Router(),
	middleware = require("../middleware"),
	Backendless = require("backendless"),
	async = require("async"),
	database = require("../configurations/database");

// This method is called on launch of the application.
router.get('/', function (req, res) {
	res.render('index', { title: 'childrenmonitor' });
});

router.get('/register', function (req, res) {
	res.render('signup', { title: 'Signup' });
});

router.post('/register', function (req, res) {
	function userRegistered(user) {
		//Hooray! Let them use the app now.
		req.flash("success", "successfully signed up...explore our application");
		res.redirect("/login");
	}
	function gotError(error) {
		// Show the error message somewhere and let the user try again.
		req.flash("error", error.code + " : " + error.message);
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

router.get('/login', middleware.isLoggedIn, function (req, res) {
	res.render('login');
});

router.get('/userchild', middleware.isLoggedIn, function (req, res) {
	res.render('user_child');
});

router.get('/profile', middleware.isLoggedIn, function (req, res) {
	res.render('profile');
});

router.get('/settings', middleware.isLoggedIn, function (req, res) {
	res.render('settings');
});

router.get('/record', middleware.isLoggedIn, function (req, res) {
	var Query = "Parent_ID = '" + req.session.userObjectID[0].objectId + "'";
	var tableName = "ChildTable";
	middleware.getObjectID(tableName, Query, function (result) {
		res.render('record', { title: 'record', children: result.data, locations: null });
	})
});

router.post('/record/delete', middleware.isLoggedIn, function (req, res) {
	Backendless.Data.of("Location").remove({ objectId: req.body.locationObjectID })
		.then(function (timestamp) {
			//res.redirect('record');
		})
		.catch(function (error) {
		});
});

router.post('/record', middleware.isLoggedIn, function (req, res) {
	var Query = "Child_ID = '" + req.body.childObjectID + "'";
	var tableName = "Location";
	middleware.getObjectID(tableName, Query, function (result) {
		if (result && result.data && result.data.length) {
			res.json( { status : 200, locations: result.data });			
		} else {
			res.json({ status: 400 })
		}
	})
});

router.get('/alert', middleware.isLoggedIn, function (req, res) {
	res.render('alert');
});

router.get('/about', middleware.isLoggedIn, function (req, res) {
	res.render('about');
});

router.get('/user', middleware.isLoggedIn, function (req, res) {
	res.render('user');
});

router.post("/login", function (req, res) {
	function userLoggedIn(user) {
		var Query = "email = '" + req.body.emailID + "'";
		var tableName = "Users";
		middleware.getObjectID(tableName, Query, function (result) {
			if (result.data[0].objectId != null) {
				req.session.userObjectID = result.data;
			}
			res.redirect("/welcome");
		})
	}
	function gotError(error) {
		console.log("error message - " + error.message);
		console.log("error code - " + error.statusCode);
		res.redirect("/login");
	}
	Backendless.UserService.login(req.body.emailID, req.body.password, false)
		.then(userLoggedIn).catch(gotError);
});


router.get('/logout', function (req, res) {
	function userLoggedOut() {
		req.flash("success", "successfully logged out");
		res.redirect("/");
	}
	function gotError(error) {
		console.log("error message - " + error.message);
		console.log("erroror code - " + error.statusCode);
	}
	Backendless.UserService.logout().then(userLoggedOut).catch(gotError);
});

router.get("/forgotPassword", function (req, res) {
	res.render("forgotpassword")
});

router.post("/forgotPassword", function (req, res) {
	function passwordRecoverySent() {
		req.flash("success", "Password reset link was emailed to your registered email");
		res.redirect("/");
	}
	function gotError(error) {
		req.flash("error", "email was wrong or not found in our system");
		res.redirect("back");
	}
	Backendless.UserService.restorePassword(req.body.emailID).then(passwordRecoverySent).catch(gotError);
});

module.exports = router;
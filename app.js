var Parse      = require("parse/node"),
	path       = require("path"),
	flash      = require("connect-flash"),
	logger     = require("morgan"),
	passport = require('passport');
	ParseStrategy = require('passport-parse');
	bodyParser = require("body-parser"),
	express    = require("express"),
	session    = require("express-session"),
	app        = express(),
	http       = require("http").Server(app),
	Backendless = require("backendless"),
 	constants = require("./configurations/config");
//importing routes
var indexRoutes = require("./routes/index"),
	userRoutes  = require("./routes/user");

require("./configurations/database");
                    
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger("dev"));
app.use(flash());
app.use(session({
	secret: "children-monitoring system",
	resave: false,
	saveUninitialized: false
}));
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");
var parseStrategy = new ParseStrategy({parseClient: Parse});
// setting passport with the strategies
passport.use(parseStrategy);
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
app.use(passport.initialize());
app.use(passport.session());
//configuring application
app.use(express.static("public"));

app.use(function(req,res,next){
	res.locals.user = req.user;
	res.locals.error   = req.flash("error");
	res.locals.success = req.flash("success");
	res.locals.warning = req.flash("warning");
	next();
});

app.use(indexRoutes);
app.use(userRoutes);

app.use(function(req,res){
	res.status(404).render("404");
});

app.listen(process.env.PORT || 4002,process.env.IP,function(){
	console.log("children-monitoring system has started on port: 4001");
});
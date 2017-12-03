var Parse      = require("parse/node"),
	path       = require("path"),
	flash      = require("connect-flash"),
	logger     = require("morgan"),
	bodyParser = require("body-parser"),
	express    = require("express"),
	session    = require("express-session"),
	http       = require("http").Server(app),
	app        = express();
//importing routes
var indexRoutes = require("./routes/index"),
	userRoutes  = require("./routes/user");
//configuring parse database
const appId  = "WZ7jM1yi3Do7Ekt0CZ9immXv4ahpKsK4vFiM5Lsf",
	javakey  = "xv3hAAweUFPjdSoqbq1cZsQfmnZBjbxxtt0Ym3iv";
Parse.initialize(appId,javakey);
Parse.serverURL="https://parseapi.back4app.com/";
//configuring application
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger("children-monitoring"));
app.use(flash());
app.use(session({
	secret: "children-monitoring system",
	resave: false,
	saveUninitialized: false
}));
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

app.use(function(req,res,next){
	res.locals.error   = req.flash("error");
	res.locals.success = req.flash("success");
});

app.use(function(req,res){
	res.status(404).render("404");
});

app.listen(process.env.PORT || 8081,process.env.IP,function(){
	console.log("children-monitoring system has started");
})
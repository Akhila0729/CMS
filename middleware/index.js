var middleware = {};

middleware.isLoggedIn=function(req,res,next){
	function success(result){
		return next();
	}
	function error(error){
		req.flash("error","Please login to continue..");
		res.redirect("/login");
	}
	Backendless.UserService.isValidLogin().then(success).catch(error);
}

module.exports = middleware;
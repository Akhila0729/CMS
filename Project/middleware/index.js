
var isLoggedIn =function(req,res,next){
	function success(result){
		return next();
	}
	function error(error){
		req.flash("error","Please login to continue..");
		res.redirect("/login");
	}
	Backendless.UserService.isValidLogin().then(success).catch(error);
}

module.exports.isLoggedIn = isLoggedIn;

var getObjectID = function (tableName, Query, callback) {
    var queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(Query);
    var test = Backendless.Data.of(tableName).find(queryBuilder)
        .then(function (result) {
            if (result.length === 0) {
                callback({ data: null });
            } else {
                callback({ data: result});
            }
        })
        .catch(function (fault) {
            console.log(fault);
            // an error has occurred, the error code can be retrieved with fault.statusCode
        });
}
module.exports.getObjectID = getObjectID

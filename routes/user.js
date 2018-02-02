var express    = require('express'),
	middleware = require("../middleware"),
    router     = express.Router();

//This method is called when the user login successfully.
router.get('/welcome',middleware.isLoggedIn, function (req, res) {
    res.render('user', {title: 'User'});
});

router.post('/addChild', function(req,res){
    Backendless.Data.of( "ChildTable" ).save( { foo:"bar" } )
    .then( function( obj ) {
        console.log( "object saved. objectId " + obj.objectId )
    } )
    .catch( function( error ) {
        console.log( "got error - " + error )
    })
})
module.exports = router;

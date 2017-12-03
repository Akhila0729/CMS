var express    = require('express'),
	middleware = require("../middleware"),
    router     = express.Router();

//This method is called when the user login successfully.
router.get('/welcome',middleware.isLoggedIn, function (req, res) {
    res.render('user', {title: 'User'});
});
 
module.exports = router;

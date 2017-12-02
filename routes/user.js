var express = require('express'),
    router = express.Router();

//This method is called when the user login successfully.
router.get('/welcome', function (req, res) {
    res.render('user', {title: 'User'});
});
 
module.exports = router;

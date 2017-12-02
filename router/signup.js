var express = require('express'),
    router = express.Router();

//This method is called when the user hits on the signup page.
router.get('/register', function (req, res) {
    res.render('signup', {title: 'Signup'});
});
 
module.exports = router;

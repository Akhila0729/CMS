var express = require('express'),
    router = express.Router();

// This method is called on launch of the application.
router.get('/', function (req, res) {
    res.render('index');
});

router.get('/register', function (req, res) {
    res.render('signup', {title: 'Signup'});
});

router.get('/login', function (req, res) {
    res.render('login', {title: 'Login'});
});

router.post('/login', function(req, res){
})

router.get('/logout', function (req, res) {
});
 
module.exports = router;

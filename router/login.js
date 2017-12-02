var express = require('express'),
    router = express.Router();

//This method is called when the user hits on the login page.
router.get('/login', function (req, res) {
    res.render('login', {title: 'Login'});
});

router.post('/login', function(req, res){
})




module.exports = api;

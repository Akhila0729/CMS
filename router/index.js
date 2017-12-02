var express = require('express'),
    router = express.Router();

// This method is called on launch of the application.
router.get('/', function (req, res) {
    res.render('index', { title: 'childrenmonitor'});
});
 
module.exports = router;

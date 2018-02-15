var express = require('express'),
    middleware = require("../middleware"),
    router = express.Router();

//This method is called when the user login successfully.
router.get('/welcome', middleware.isLoggedIn, function (req, res) {
    res.render('user', { title: 'User' });
});

router.post('/addChild', middleware.isLoggedIn, function (req, res) {
    var childTable = {
        childFirstName: req.body.childFirstName,
        childLastName: req.body.childLastName,
        childGender: req.body.childGender,
        childEmail: req.body.childEmail,
        childAddress: req.body.childAddess,
        childPhone: req.body.childPhone
    }

    var childTable = Backendless.Data.of("ChildTable").save(childTable)
        .then(function (savedObject) {
            console.log("new Contact instance has been saved");
            res.redirect("welcome");
        })
        .catch(function (error) {
            console.log("an error has occurred " + error.message);
            res.redirect("/userchild");
        })
});

router.post('/removechild', middleware.isLoggedIn, function (req, res) {

    var whereClause = "childFirstName = '" + req.body.childFirstName + "' AND childLastName = '" + req.body.childLastName + "'";
    var queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(whereClause);
    var test = Backendless.Data.of("ChildTable").find(queryBuilder)
        .then(function (result) {
            Backendless.Data.of("ChildTable").remove(result[0].objectId)
                .then(function (timestamp) {
                    console.log("Child instance has been deleted");
                })
                .catch(function (error) {
                    console.log("an error has occurred " + error.message);
                });
        })
        .catch(function (fault) {
            // an error has occurred, the error code can be retrieved with fault.statusCode
        });

    res.redirect("welcome");
});

module.exports = router;

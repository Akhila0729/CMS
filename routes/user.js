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

function objectID(tableName, Query, callback) {
    var queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(Query);
    var test = Backendless.Data.of(tableName).find(queryBuilder)
        .then(function (result) {
            if (result.length === 0) {
                callback({ data: "noRecord" });
            } else {
                callback({ data: result[0].objectId });
            }
        })
        .catch(function (fault) {
            console.log(fault);
            // an error has occurred, the error code can be retrieved with fault.statusCode
        });
}

router.post('/removechild', middleware.isLoggedIn, function (req, res) {
    var whereClause = "childFirstName = '" + req.body.childFirstName + "' AND childLastName = '" + req.body.childLastName + "'";
    objectID("childTable", whereClause, function (response) {
        var objectId = response.data;
        if (objectId === "noRecord") {
            console.log("Invalid details");
            res.redirect("/userchild");
        } else {
            Backendless.Data.of("ChildTable").remove(objectId)
                .then(function (timestamp) {
                    console.log("Child instance has been deleted");
                })
                .catch(function (error) {
                    console.log("an error has occurred " + error.message);
                });
            res.redirect("welcome");
        }

    });
});

router.post('/profile/changeuserame', middleware.isLoggedIn, function (req, res) {
    var whereClause = "username ='" + req.body.oldUsername + "'";
    objectID("Users", whereClause, function (response) {
        if (response.data === "noRecord") {
            console.log("Invalid Username");
            res.redirect("/profile");
        } else {
            Backendless.Data.of("Users").save({ objectId: response.data, username: req.body.newUsername })
                .then(function (savedObject) {
                    console.log("Username has been updated");
                })
                .catch(function (error) {
                    console.log("an error has occurred " + error.message);
                });
            res.redirect("/profile");
        }
    });
});

router.post('/profile/changePassword', middleware.isLoggedIn, function (req, res) {
    var whereClause = "username ='" + req.body.oldPassword + "'";    
    objectID("Users", whereClause, function (response) {
        if (response.data === "noRecord") {
            console.log("Incorrect Password");
            res.redirect("/profile");
        } else {
            Backendless.Data.of("Users").save({ objectId: response.data, password: req.body.newPassword })
                .then(function (savedObject) {
                    console.log("Password has been updated");
                })
                .catch(function (error) {
                    console.log("an error has occurred " + error.message);
                });
            res.redirect("/profile");
        }
    });
});
module.exports = router;

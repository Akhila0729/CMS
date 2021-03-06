var express = require('express'),
    middleware = require("../middleware"),
    router = express.Router(),
    _ = require("underscore");

router.get('/welcome', middleware.isLoggedIn, function (req, res) {
    var Query = "Parent_ID = '" + req.session.userObjectID[0].objectId + "'";
    var tableName = "ChildTable";
    middleware.getObjectID(tableName, Query, function (result) {
        res.render('user', { title: 'User', children: result.data });
    })
});

router.post('/welcome', middleware.isLoggedIn, function (req, res) {
    var Query = "Child_ID = '" + req.body.childObjectID + "'";
    var tableName = "Location";
    middleware.getObjectID(tableName, Query, function (result) {
        req.session.ChildrenLocation = result.data;
        if (result && result.data && result.data.length) {
            maxDate = _.max(_.pluck(result.data, 'created'));
            reqObj = _.where(result.data, { 'created': maxDate })
            res.json({ status: 200, longitude: reqObj[0].Longitude, latitude: reqObj[0].Latitude });
        } else {
            res.json({ status: 400 })
        }
    })
});

router.post('/addChild', middleware.isLoggedIn, function (req, res) {
    var childTable = {
        childFirstName: req.body.childFirstName,
        childLastName: req.body.childLastName,
        childGender: req.body.childGender,
        childEmail: req.body.childEmail,
        childAddress: req.body.childAddress,
        childPhone: req.body.childPhone,
        Parent_ID: req.session.userObjectID
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
    middleware.getObjectID("childTable", whereClause, function (response) {
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

router.post('/mode', middleware.isLoggedIn, function (req, res) {
    var mode = req.body.mode;
    var childTable = {
      mode: req.body.mode
    }

    var childTable = Backendless.Data.of("ChildTable").save(childTable)
        .then(function (savedObject) {
            console.log("new Contact instance has been saved");
            res.redirect("welcome");
        })
        .catch(function (error) {
            console.log("an error has occurred " + error.message);
            res.redirect("/settings");
        })

})
module.exports = router;

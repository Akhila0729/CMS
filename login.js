var express = require('express');
var api = express();
var https = require('https');
var http = require("http");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./model/testDB.db');

//This method is called when the user hits on the login page.
api.get('/', function (req, res) {
    res.render('login', {
        title: 'Login'
    });
});

api.post('/', function(req, res){
    //console.log("post method is called");
    let username = req.body.username;
    let password = req.body.password;
    console.log(username + ":" + password);

    //trying to connect database
    //This creates a user name and password for user
    var tempusername;
    var temppassword;
    db.serialize(function () {
        // db.run("DROP TABLE newTest");
        db.run("CREATE TABLE IF NOT EXISTS newTest (col1, col2)");
        db.run("INSERT INTO newTest VALUES (?, ?)",[username, password])
          //  db.run("UPDATE newTest SET col1 = ?", [selectedTimezone]);        
            db.each("SELECT * FROM newTest where col1 = 'hi'", function (err, row) {
                //console.log('timezone: ' + row.col1);
                tempusername = row.col1;
                temppassword = row.col2;
                console.log('DB : username :' + tempusername );
                console.log('DB : password :' + temppassword );
            });
        
    });
    // db.close();


    res.redirect("/login");
})



//exporting modules
module.exports = api;

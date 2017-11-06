const express = require('express');
const api = express.Router();
const https = require('https');
const http = require("http");

//This method is called when the user hits on the signup page.
api.get('/', function (req, res) {
    res.render('signup', {
        title: 'Signup'
    });
});
 
module.exports = api;

const express = require('express');
const api = express.Router();
const https = require('https');
const http = require("http");

//This method is called when the user login successfully.
api.get('/', function (req, res) {
    res.render('user', {
        title: 'User'
    });
});
 
module.exports = api;
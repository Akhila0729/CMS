var Backendless = require("backendless"),
constants = require("./config");

//Configuring Backendless Database
var APP_ID = constants.Database_APP_ID;
var API_KEY = constants.Database_API_KEY;
Backendless.serverURL = constants.Database_server_URL;
Backendless.initApp(APP_ID, API_KEY);

module.exports.Backendless = Backendless;
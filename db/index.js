var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/testing");

var db = mongoose.connection;

db.on("error", function() { console.log("error"); });

db.once("open", function() {
    console.log("connected!")
});
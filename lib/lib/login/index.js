var express = require("express"),
    app = module.exports = express();

app.get("/login", function (req, res) {
    res.render("login");
});
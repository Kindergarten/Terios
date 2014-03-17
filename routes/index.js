
/*
 * GET home page.
 */

app = require("../app");

app.get("/", function (req, res) {
    res.send("hi");
});

require("./user");
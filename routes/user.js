
/*
 * GET users listing.
 */

app.get("/user", function (req, res) {
    res.render("index", { title: "User Page" });
});
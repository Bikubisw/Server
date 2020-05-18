module.exports.home = function(req, res) {
    return res.render('home', { title: "home" });
}
module.exports.action = function(req, res) {
    return res.end("<h1>What the fuck bitch</h1>")
}
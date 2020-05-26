const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Codial_development');
const Codial_Db = mongoose.connection;
// error
Codial_Db.on('error', console.error.bind(console, ' Bikram Biswas connection error:'));
// up and then print the meassage
Codial_Db.once('open', function() {
    console.log("We are connected with the database");
});
module.exports = Codial_Db;
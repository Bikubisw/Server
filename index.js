const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const path = require('path');
const db = require('./config/mongoose');
const expressLayout = require("express-ejs-layouts");
// use express router
app.use(expressLayout);
app.use(express.urlencoded());
app.use(cookieParser());
app.use(require('./routes'));
app.set("view engine", "ejs");
app.use(express.static('assets'));
app.use(expressLayout);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("views", path.join(__dirname, 'views'));
app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server: ${err}`);


    }
    console.log(`Server is running on port:${port}`);

});
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
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth-strategy');
const Mongostore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
app.use(cookieParser());
app.use(expressLayout);
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputstyle: 'extended',
    prefix: '/css'
}));
app.use(express.static('./assets'));

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, 'views'));
app.use(session({
    name: 'Codial',
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new Mongostore(


        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err) {
            console.log(err || 'Connection failed with Mongodb');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use(require('./routes'));
app.use('/users/profile/uploads', express.static(__dirname + '/uploads'));

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server: ${err}`);
        return;

    }
    console.log(`Server is running on port:${port}`);

});
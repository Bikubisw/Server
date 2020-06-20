const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
require('./config/view_helper')(app);
const port = 8000;
const path = require('path');
const db = require('./config/mongoose');
const expressLayout = require("express-ejs-layouts");
// use express router
app.use(expressLayout);
app.use(express.urlencoded({ extended: false }));
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth-strategy');
const Mongostore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const chatServer = require('http').Server(app);
const chatsockets = require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log("Chat server is running on port 5000");
app.use(cookieParser());
app.use(expressLayout);
if (env.name == 'development') {
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputstyle: 'extended',
        prefix: '/css'
    }));
}
app.use(express.static(env.asset_path));
app.use(logger(env.morgan.mode, env.morgan.options));

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, 'views'));
app.use(session({
    name: 'Codial',
    secret: env.session_cookie_key,
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
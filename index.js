const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
// use express router
app.use(require('./routes'));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));
app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server: ${err}`);


    }
    console.log(`Server is running on port:${port}`);

});
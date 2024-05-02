//imports express
const express = require('express');
//imports connection route
const db = require('./config/connection');
//imports routes
const routes = require('./routes');
//returns the working directory
const cwd = process.cwd();
//connects to the port specified, or to 3001 at the local host
const PORT = process.env.PORT || 3001;
//imports express route
const app = express();

//ensures a valid url entered
app.use(express.urlencoded({ extended: true }));
//middlware that only parses json
app.use(express.json());
//sets up route for use
app.use(routes);
//ensures the port is open and running
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server for Social Network API running on port ${PORT}`)
    });
});
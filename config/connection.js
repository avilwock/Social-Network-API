//connect and connection are destructured from mongoose
const { connect, connection } = require('mongoose');
//Specifies that socialDB is the database connected to, and gives the address
const connectionString = 'mongodb://127.0.0.1:27017/socialDB';
//calls a connection to the connectionString
connect (connectionString);
//exports the connection for use in application
module.exports = connection;
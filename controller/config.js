const mysql = require('mysql');

const con = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12647214",
    password: "Gc6DHcMAm3",
    database: "sql12647214"
});

con.connect();

module.exports = con;
var mysql = require('mysql2');
require('dotenv').config();

var config;
config = {
    mysql_connection : mysql.createConnection({
        host     : process.env.MYSQLHOST,
        user     :  process.env.MYSQLUSER,
        password :  process.env.MYSQLPASSWORD,
        database : process.env.MYSQLDATABASE,
        port : process.env.MYSQLPORT
    })
};
module.exports = config;
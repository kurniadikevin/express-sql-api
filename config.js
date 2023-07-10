var mysql = require('mysql');
require('dotenv').config();

var config;
config = {
    mysql_connection : mysql.createConnection({
        host     : process.env.MYSQLHOST,
        user     :  process.env.MYSQLUSER,
        password :  process.env.MYSQLPASSWORD,
        database : process.env.MYSQLDATABASE
    })
};
module.exports = config;
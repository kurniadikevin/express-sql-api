var mysql = require('mysql');
var config;
config = {
    mysql_connection : mysql.createConnection({
        host     : 'localhost',
        user     : 'newuser',
        password : 'password',
        database : 'mydb'
    })
};
module.exports = config;
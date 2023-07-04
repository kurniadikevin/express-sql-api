const con = require('../config.js').mysql_connection;
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
var express = require('express');
var router = express.Router();
const con = require('../config').mysql_connection;

// POST Create table 
router.post('/create-table',(req,res,next)=>{
  var sql = "CREATE TABLE users (name VARCHAR(255), password VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("User table created!");
    res.send('User table created')
  });
})

/* GET users list */
router.get('/all', function(req, res, next) {
  const sql='SELECT * FROM users';
  con.query(sql, function (err, result) {
    if (err) throw res.send(err);
    res.send(result)
  });
});

// GET user by id
router.get('/by-id/:userId',(req,res,next)=>{
  const userId=req.params.userId
  const sql=`SELECT * FROM users WHERE id = ${userId}`
  con.query(sql, function (err, result) {
    if (err) throw res.send(err);
    res.send(result)
  });
})


// POST Create user 
router.post('/create',(req,res,next)=>{
    const {name, password}= req.body;
    var sql = `INSERT INTO users (name, password) VALUES('${name}', '${password}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send({
        info : result,
        username : req.body.username,
      } )
    });
})

module.exports = router;

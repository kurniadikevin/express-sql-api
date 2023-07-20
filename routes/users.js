var express = require('express');
var router = express.Router();
const con = require('../config').mysql_connection;
const bcrypt =require('bcryptjs');
const middlewares= require('../middleware/middleware');

// POST Create table 
router.post('/create-table',(req,res,next)=>{
  var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), password VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("User table created!");
    res.send('User table created')
  });
})

/* GET users list */
router.get('/all', middlewares.verifyToken,function(req, res, next) {
  const sql='SELECT * FROM users';
  con.query(sql, function (err, result) {
    if (err) throw res.send(err);
    const filteredData= result.map((data)=>{
      const { password, ...rest } = data; 
      return rest;
    })
    res.send(filteredData)
  });
});

// GET user by id
router.get('/by-id/:userId', middlewares.verifyToken,(req,res,next)=>{
  const userId=req.params.userId
  const sql=`SELECT * FROM users WHERE id = ${userId}`
  con.query(sql, function (err, result) {
    if (err) throw res.send(err);
    res.send(result)
  });
})


// POST Create user with hashed password
router.post('/create',middlewares.checkForDuplicateUserName,(req,res,next)=>{
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if(err){return next('password failed to proceed')}
    const name= req.body.name;
    const values=[name,hashedPassword]
    var sql = `INSERT INTO users (name, password) VALUES(?,?)`;
    con.query(sql,values, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send({
        info : result,
        username : req.body.username,
        message : 'New user created',
        status : 200
      } )
    });
  })
})

//POST login user
router.post('/login',middlewares.checkUserDataForLogin,middlewares.generateTokenMiddleware,
 (req,res,next)=>{
  const passwordInput=req.body.password;
  const hashedPassword=res.locals.data.password;
  bcrypt.compare(passwordInput, hashedPassword, (err, result) => {
    if (err) {
      next(err)
      // Handle error
    } else if (result) {
      // Passwords match, login successful
      let {password, ...foundUser} = (res.locals.data)
      res.send({
        message: 'Login success',
        result : result,
        data : foundUser,
        token : res.locals.token,
        status : 200
      })
    } else {
      // Passwords do not match, login failed
      res.send({
        status : 404,
        message : 'Password not match'
      })
    }
  });
} )


//testing middleware
router.get('/middleware',middlewares.checkForDuplicateUserName)

module.exports = router;

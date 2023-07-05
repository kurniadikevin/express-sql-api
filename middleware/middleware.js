const con = require('../config').mysql_connection;
require('dotenv').config();
const jwt = require('jsonwebtoken');


exports.checkForDuplicateUserName=(req,res,next)=>{
    const name= req.body.name;
    var sql = `SELECT * FROM users WHERE name = '${name}'`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        if(result.length > 0){
            res.send({
                status : 200,
                message : `User with name '${name}' is already exist`
            })
        } else{
            next()
        }
      });
}

exports.checkUserDataForLogin=(req,res,next)=>{
    const name= req.body.name;
    var sql = `SELECT * FROM users WHERE name = '${name}'`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        if(result.length > 0){
           res.locals.data=result[0];
           next()
        } else{
            res.send({
                status : 200,
                message : 'User not founded'
            })
        }
      });
}


// middleware for generating bearer token
exports.generateTokenMiddleware=(req,res,next)=>{
    const user ={
      username : req.body.username,
      password : req.body.password
    }
    jwt.sign({user},process.env.JWT_BEARER_SECRETKEY ,(err,token)=>{
    res.locals.token= token// store token on res.locals
    })
    next()
  }
  

//Verify Token
exports.verifyToken =(req,res,next)=>{
    //Auth header value = > send token into header
    const bearerHeader = req.headers.authorization;
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //split the space at the bearer
        const bearer = bearerHeader.split(' ');
        //Get token from string
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        
        //next middleweare
        jwt.verify(req.token,process.env.JWT_BEARER_SECRETKEY,(err)=>{
            if(err)
                res.sendStatus(403);
            else{
               next()
            }
        }) 
    }else{
        //Fobidden
        res.sendStatus(403);
    }
}
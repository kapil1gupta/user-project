var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/event';
var md5 = require('md5'); 
exports.addUser = function(req,callback){
  MongoClient.connect("mongodb://localhost:27017/event",function(err,db){
    if(err)
    {
      throw err;
    }
    else {
      if(!req || !req.body || !req.body.firstName || !req.body.lastName || !req.body.userName || !req.body.email || !req.body.phoneNumber || !req.body.password)
      {
        var resJson = {
          http_code : "400",
          message : "please fill all the mandatory filed"
        }
        return callback(false,resJson);
      }
      db.collection('counters').findOne({"_id":"user_id"},function(err,res){
        var count = res.seq
        count = count + 1
    
        db.collection('counters').updateOne({'_id':'user_id'},{'seq': count},function(err,res1){
          if(err)
          {
            throw err
          }
          else {
            var schema = {
              userId : count,
              userName : req.body.userName,
              firstName : req.body.firstName,
              lastName :  req.body.lastName,
              email : req.body.email,
              phoneNumber : req.body.phoneNumber,
              password : md5(req.body.password)
            }

              db.collection('user').insertOne(schema,function(err,res2){
       if(err)
      {
        throw err
      }
      else {
         var resJson = {
           http_code: 200,
           message: 'sucessfully inserted'
         }
           return callback(false,resJson)
       }
    });
          }
        });

       
      });
  }
});
}
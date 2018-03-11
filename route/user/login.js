var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/event';
var md5 = require('md5'); 
exports.Authentication = function(req,callback){
  MongoClient.connect("mongodb://localhost:27017/event",function(err,db){
    if(err)
    {
      throw err;
    }
    else {
      if(!req || !req.body || !req.body.userName || !req.body.password)
      {
        var resJson = {
          http_code : "400",
          message : "username and password is mandatory"
        }
        return callback(false,resJson);
      }

        var query = {
                  userName : req.body.userName,
                  password : md5(req.body.password)
                }

        var projection = {

            "_id" : 0
        }

        db.collection('user').find(query,projection).toArray(function(err,res){
          if(err)
          {
            throw err
          }
          else if(res.length <= 0){
            var resJson = {
              http_code : 404,
              message : "user not found"
            }
            return callback(false,resJson);
          }
          else {
             var resJson = {
               http_code: 200,
               message: res
             }
               return callback(false,resJson)
           }
        });
  }
});
}
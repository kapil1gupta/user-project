var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/event';
var md5 = require('md5'); 
exports.viewProfile = function(req,callback){
  
  MongoClient.connect("mongodb://localhost:27017/event",function(err,db){
    if(err)
    {
      throw err;
    }
    else {
        
      if(!req || !req.body || (!req.body.userId && !req.body.firstName))
      {
        var resJson = {
          http_code : "400",
          message : "pls fill all the mandatory field"
        }
        return callback(false,resJson);
      }
        if(req.body.userId){

        var query = {
                  userId : parseInt(req.body.userId),
                  
                }

        var projection = {

          "_id" : 0,
          "password" : 0,
          "userName" : 0,
          "userId" : 0
        }
    }
     else {
        var query = {
            firstName : req.body.firstName,
            
          }

        var projection = {

             "_id" : 0,
             "password" : 0,
             "userName" : 0,
             "userId" : 0
        }

    }
        db.collection('user').find(query,projection).toArray(function(err,res){
          if(err)
          {
            throw err
          }
          else if(res.length <= 0)
          {
            var resJson = {
              http_code : 404,
              message : "no data found"
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
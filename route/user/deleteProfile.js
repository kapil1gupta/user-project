var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/event';
var md5 = require('md5'); 
exports.deleteProfile = function(req,callback){
  MongoClient.connect("mongodb://localhost:27017/event",function(err,db){
    if(err)
    {
      throw err;
    }
    else {
      if(!req || !req.body || !req.body.userId)
      {
        var resJson = {
          http_code : "400",
          message : "please fill all the mandatory filed"
        }
        return callback(false,resJson);
      }
      
        var query = {
                  userId : parseInt(req.body.userId),
                }

        db.collection('user').deleteOne(query,function(err,res){
          if(err)
          {
            throw err
          }
          else if(res.result.n <= 0){
              var resJson = {
                  http_code : 404,
                  message : "no data found"
              }
              return callback(false,resJson);
          }
          else {
             var resJson = {
               http_code: 200,
               message: 'sucessfully Deleted'
             }
               return callback(false,resJson)
           }
        });
      
  }
});
}
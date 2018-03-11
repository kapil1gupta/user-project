var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/event';
var md5 = require('md5'); 
exports.editProfile = function(req,callback){
  MongoClient.connect("mongodb://localhost:27017/event",function(err,db){
    if(err)
    {
      throw err;
    }
    else {
      if(!req || !req.body || !req.body.userId || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.phoneNumber)
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
        var query1 = {
          $set: {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            phoneNumber : req.body.phoneNumber
          }
        }

        db.collection('user').updateOne(query,query1,function(err,res){
          if(err)
          {
            throw err
          }
          else {
             var resJson = {
               http_code: 200,
               message: 'sucessfully updated'
             }
               return callback(false,resJson)
           }
        });
      
  }
});
}
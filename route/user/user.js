var express = require('express');
var app = express();
var registerUser = require('./registerUser.js');
var login = require('./login.js')
var viewProfile = require('./viewProfile');
var editProfile = require('./editProfile.js');
var deleteProfile = require('./deleteProfile')
// register  a user
app.post('/registerUser',function(req,res){
  var callback = function(err,output){
    res.statusCode = output.http_code;
    res.json(output);
  }
  registerUser.addUser(req,callback);
});

//authentication of a user
app.post('/authentication',function(req,res){
  var callback = function(err,output){
    res.statusCode = output.http_code;
    res.json(output);
  }
  login.Authentication(req,callback);
});

// view profile of a user
app.post('/viewProfile',function(req,res){
  var callback = function(err,output){
    res.statusCode = output.http_code;
    res.json(output);
  }
  viewProfile.viewProfile(req,callback);
});

//update profile
app.post('/editProfile',function(req,res){
  var callback = function(err,output){
    res.statusCode = output.http_code;
    res.json(output);
  }
  editProfile.editProfile(req,callback);
});

// delet profile
app.post('/deleteProfile',function(req,res){
  var callback = function(err,output){
    res.statusCode = output.http_code;
    res.json(output);
  }
  deleteProfile.deleteProfile(req,callback);
});

module.exports = app;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var index = require('./route/index.js');
var user = require('./route/user/user.js');

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", req.headers.origin);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
	res.header("Access-Control-Allow-Credentials", true);
	next();
});

app.use('/',index);
app.use('/user',user)
//Listening port
app.listen(3000, function(){
  console.log('Listening on port 3000...');
});
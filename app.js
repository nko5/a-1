var http = require('http');
var path = require('path');
var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

//Create a static file server
app.use(express.static(path.join(__dirname, 'public')));

//Get the dummy data
require('./server/ddata.js');

var server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

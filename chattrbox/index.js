var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var mime = require('mime');

var handleError = function(err, res) {
  res.writeHead(404);
  res.end();
};

var showErrorPage = function(err, res) {
  fs.readFile('app/error.html', function(err, data){
    res.setHeader('Content-Type',
  'text/html');
    res.end(data);
  });
};

var server = http.createServer(function(req, res){
  console.log('Responding to a request.');
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data){
    if (err) {
      //handleError(err, res);
      showErrorPage(err, res);
      return;
    } else {
      //set mime type
      var mimeType = mime.getType(filePath);
      res.setHeader('Content-Type', mimeType);
      res.end(data);
    }
  });
});
server.listen(3000);

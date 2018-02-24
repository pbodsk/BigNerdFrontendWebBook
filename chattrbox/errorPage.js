var fs = require('fs');
var path = require('path');

var showErrorPage = function(err, res, resourceFolder, fileName) {
  fs.readFile(resourceFolder + '/' + fileName, function(err, data){
    res.setHeader('Content-Type',
  'text/html');
    res.end(data);
  });
};

module.exports = showErrorPage;

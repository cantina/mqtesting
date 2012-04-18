var argv = require('optimist')
  .default('port', '8080')
  .alias('p', 'port')
  .argv;
var http = require('http');

var cantina = require('cantina-core');
var service = new cantina.Service();

var server = http.createServer(function(req, res) {
  service.request('//hello/', function(err, sres) {
    res.writeHead(sres.code, sres.headers);
    res.end(sres.body, 'utf8');
  });
}).listen(argv.port);
console.log('Listening on ' + argv.port + '...');

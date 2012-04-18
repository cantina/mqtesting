var argv = require('optimist')
  .default('port', '8000')
  .alias('p', 'port')
  .argv;

var cantina = require('cantina-core');
var service = new cantina.Service();

var body = JSON.stringify({hello: 'world', pid: process.pid});
var headers = {
  'Content-Type': 'application/json',
  'Content-Length': body.length
};

var server = require('http').createServer(function (req, res) {
  res.writeHead(200, headers);
  res.end(body, 'utf8');
  // console.log('Request ok.');
});

server.listen(argv.port);
console.log('listening on port ' + argv.port);
// Broadcast our port right away
service.publish('backend:started', argv.port);
// Broadcast our port when a server starts
service.subscribe('server:started', function(port) {
  service.publish('backend:discover:' + port, argv.port);
});
// Broadcast that our port is now closed.
process.on('SIGINT', function () {
  service.publish('backend:ended', argv.port);
  setTimeout(process.exit, 50);
});


var argv = require('optimist')
  .default('url', 'localhost:8000')
  .default('amqp', 'localhost')
  .argv;

var cantina = require('cantina-service');
var service = new cantina.Service({url: 'amqp://' + argv.amqp});

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

argv.port = parseInt(argv.url.split(':')[1]);

server.listen(argv.port);
console.log('listening on port ' + argv.port);
// Broadcast our port right away
service.publish('backend:started', argv.url);
// Broadcast our port when a server starts
service.subscribe('server:started', function(url) {
  service.publish('backend:discover:' + url, argv.url);
});
// Broadcast that our port is now closed.
process.on('SIGINT', function () {
  service.publish('backend:ended', argv.url);
  setTimeout(process.exit, 50);
});


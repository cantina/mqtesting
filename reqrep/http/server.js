var argv = require('optimist')
  .default('port', '8080')
  .alias('p', 'port')
  .argv;

var cantina = require('cantina-core');
var service = new cantina.Service();
var bouncy = require('bouncy');

var backends = [];

service.subscribe('backend:started', function(port) {
  backends.push(port);
  console.log("backend at " + port + " started.");
});
service.subscribe('backend:ended', function(port) {
  for (var i in backends) {
    if (backends[i] === port) {
      backends.splice(i, 1);
      break;
    }
  }
  console.log("backend at " + port + " ended.");
});
service.subscribe('server:started', function(port) {
  console.log("server at " + port + " started.");
});

bouncy(function(req, bounce) {
  var target = backends.shift();
  backends.push(target);
  bounce(target);
}).listen(argv.port);

service.subscribe('backend:discover:' + argv.port, function(port) {
  backends.push(port);
  console.log("backend at " + port + " discovered!");
});

setTimeout(function() {
  service.publish('server:started', argv.port);
}, 50);

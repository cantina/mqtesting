var argv = require('optimist')
  .default('url', 'localhost:8080')
  .default('amqp', 'localhost')
  .argv;

var cantina = require('cantina-core');
var service = new cantina.Service({url: 'amqp://' + argv.amqp});
var bouncy = require('bouncy');

var backends = [];

service.subscribe('backend:started', function(url) {
  backends.push(url);
  console.log("backend at " + url + " started.");
});
service.subscribe('backend:ended', function(url) {
  for (var i in backends) {
    if (backends[i] === url) {
      backends.splice(i, 1);
      break;
    }
  }
  console.log("backend at " + url + " ended.");
});
service.subscribe('server:started', function(url) {
  console.log("server at " + url + " started.");
});

argv.port = parseint(argv.url.split(':')[1]);

bouncy(function(req, bounce) {
  var target = backends.shift();
  backends.push(target);
  bounce(target);
}).listen(argv.port);

service.subscribe('backend:discover:' + argv.url, function(url) {
  backends.push(url);
  console.log("backend at " + url + " discovered!");
});

setTimeout(function() {
  service.publish('server:started', argv.url);
}, 50);

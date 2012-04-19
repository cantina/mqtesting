var argv = require('optimist')
  .default('host', 'localhost')
  .alias('h', 'host')
  .argv;
var context = require('rabbit.js').createContext('amqp://' + argv.host);
var stats = require('./stats');

stats.clear();
stats.setTitle('Rabbit Request');

context.on('ready', function() {
  var req = context.socket('REQ');
  req.connect('test', function() {

    req.setEncoding('utf8');

    req.on('data', function(start) {
      var time = new Date().getTime();
      start = parseInt(start, 10);
      stats.updateCounts();
      stats.updateLatency(time - start);
      req.write(time.toString(), 'utf8');
    });

    var time = new Date().getTime();
    req.write(time.toString(), 'utf8');
  });
});

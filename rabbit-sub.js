var argv = require('optimist')
  .default('host', 'localhost')
  .alias('h', 'host')
  .argv;
var context = require('rabbit.js').createContext('amqp://' + argv.host);
var stats = require('./stats');

stats.clear();
stats.setTitle('Rabbit Subscriber');

context.on('ready', function() {
  var sub = context.socket('SUB');
  sub.connect('test', function() {
    sub.setEncoding('utf8');
    sub.on('data', function(start) {
      stats.updateCounts();
      stats.updateLatency(new Date().getTime() - start);
    });
  });
});
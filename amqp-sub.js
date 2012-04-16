var argv = require('optimist')
  .default('host', 'localhost')
  .alias('h', 'host')
  .argv;
var conn = require('amqp').createConnection({url: 'amqp://' + argv.host});
var stats = require('./stats');

stats.clear();
stats.setTitle('AMQP Subscriber');

conn.on('ready', function() {
  conn.queue('test', function(queue) {
    queue.subscribe(function(message, headers, deliveryInfo) {
      stats.updateCounts();
      stats.updateLatency(new Date().getTime() - message);
    });
  });
});

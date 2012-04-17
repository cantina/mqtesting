var argv = require('optimist')
  .default('host', 'localhost')
  .alias('h', 'host')
  .argv;
var cantina = require('cantina-core');
var service = new cantina.Service({url: 'amqp://' + argv.host});
var stats = require('./stats');

stats.clear();
stats.setTitle('Cantina Subscriber');

service.subscribe('test', function(start) {
  stats.updateCounts();
  stats.updateLatency(new Date().getTime() - start)
});

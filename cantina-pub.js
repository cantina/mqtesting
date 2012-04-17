var argv = require('optimist')
  .default('host', 'localhost')
  .alias('h', 'host')
  .argv;
var service = new require('cantina-core').Service({url: 'amqp://' + argv.host});
var stats = require('./stats');

stats.clear();
stats.setTitle('Cantina Publisher');

var doit = function() {
  var time = new Date().getTime();
  service.publish('test', time);
  stats.updateCounts();
  process.nextTick(doit);
}
doit();


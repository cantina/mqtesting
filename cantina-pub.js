var argv = require('optimist')
  .default('host', 'localhost')
  .alias('h', 'host')
  .argv;
var cantina = require('cantina-service');
var s = new cantina.Service({url: 'amqp://' + argv.host});
var stats = require('./stats');

stats.clear();
stats.setTitle('Cantina Publisher');

var doit = function() {
  var time = new Date().getTime();
  s.publish('test', time);
  stats.updateCounts();
  process.nextTick(doit);
}
doit();


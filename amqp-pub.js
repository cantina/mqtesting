var argv = require('optimist')
  .default('host', 'localhost')
  .alias('h', 'host')
  .argv;
var conn = require('amqp').createConnection({url: 'amqp://' + argv.host});
var stats = require('./stats');

stats.clear();
stats.setTitle('AMQP Publisher');

conn.on('ready', function() {
  var doit = function() {
    var time = new Date().getTime();
    conn.publish('test', time);
    stats.updateCounts();
    process.nextTick(doit);
  }
  doit();
});

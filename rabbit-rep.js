var argv = require('optimist')
  .default('host', 'localhost')
  .alias('h', 'host')
  .argv;
var context = require('rabbit.js').createContext('amqp://' + argv.host);
var stats = require('./stats');

stats.clear();
stats.setTitle('Rabbit Reply');

context.on('ready', function() {
  var rep = context.socket('REP');
  rep.setEncoding('utf8');
  rep.connect('test', function() {

    rep.on('data', function(start) {
      rep.write(start, 'utf8');
      var time = new Date().getTime();
      start = parseInt(start, 10);
      stats.updateCounts();
      stats.updateLatency(time - start);
    });

  });
});

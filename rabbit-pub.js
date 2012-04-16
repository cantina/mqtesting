var argv = require('optimist')
  .default('host', 'localhost')
  .alias('h', 'host')
  .argv;
var context = require('rabbit.js').createContext('amqp://' + argv.host);
var stats = require('./stats');

stats.clear();
stats.setTitle('Rabbit Publisher');

context.on('ready', function() {
  var pub = context.socket('PUB');
  pub.connect('test', function() {
    var doit = function() {
      var time = new Date().getTime();
      pub.write(time);
      stats.updateCounts();
      process.nextTick(doit);
    }
    doit();
  });
});

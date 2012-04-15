var context = require('rabbit.js').createContext();
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
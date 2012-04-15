var context = require('rabbit.js').createContext();
var stats = require('./stats');

stats.clear();
stats.setTitle('Rabbit Publisher');

context.on('ready', function() {
  var pub = context.socket('PUB');
  pub.connect('test', function() {
    var i = 0;
    var doit = function() {
      var time = new Date().getTime();
      pub.write(time);
      stats.updateCounts();
      process.nextTick(doit);
    }
    doit();
  });
});

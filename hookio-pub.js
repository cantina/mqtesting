var hookio = require('hook.io');
var stats = require('./stats');

var hookB = hookio.createHook({
  name: "b",
  silent: true
});

stats.clear();
stats.setTitle('Hook.io Publisher');

hookB.on('hook::ready', function() {
  var doit = function() {
    var time = new Date().getTime();
    hookB.emit('test', time);
    stats.updateCounts();
    process.nextTick(doit);
  }
  doit();
});
hookB.start();

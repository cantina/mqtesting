var hookio = require('hook.io');
var stats = require('./stats');

var hookA = hookio.createHook({
  name: "a",
  silent: true
});

stats.clear();
stats.setTitle('Hook.io Subscriber');

hookA.on('*::test', function(start) {
  stats.updateCounts();
  stats.updateLatency(new Date().getTime() - start);
});
hookA.start();

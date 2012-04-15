var dnode = require('dnode');
var stats = require('./stats');

stats.clear();
stats.setTitle('DNode Publisher');

dnode.connect(12345, function(remote) {
  var doit = function() {
    var time = new Date().getTime();
    remote.test(time);
    stats.updateCounts();
    process.nextTick(doit);
  }
  doit();
});

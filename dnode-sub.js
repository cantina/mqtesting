var dnode = require('dnode');
var stats = require('./stats');

stats.clear();
stats.setTitle('DNode Subscriber');

var server = dnode({
  test: function(start, cb) {
    stats.updateCounts();
    stats.updateLatency(new Date().getTime() - start);
  }
});
server.listen(12345);

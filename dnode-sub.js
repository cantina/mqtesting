var argv = require('optimist')
  .default('port', 12345)
  .alias('p', 'port')
  .argv;
var dnode = require('dnode');
var stats = require('./stats');

stats.clear();
stats.setTitle('DNode Subscriber on ' + argv.port);

var server = dnode({
  test: function(start, cb) {
    stats.updateCounts();
    stats.updateLatency(new Date().getTime() - start);
  }
});
server.listen(argv.port);

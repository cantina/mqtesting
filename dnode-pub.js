var argv = require('optimist')
  .default('host', 'localhost')
  .alias('h', 'host')
  .default('port', 12345)
  .alias('p', 'port')
  .argv;
var dnode = require('dnode');
var stats = require('./stats');
var address = 'http://' + argv.host + ':' + argv.port;

stats.clear();
stats.setTitle('DNode Publisher to ' + address);

dnode.connect(argv.host, argv.port, function(remote) {
  var doit = function() {
    var time = new Date().getTime();
    remote.test(time);
    stats.updateCounts();
    process.nextTick(doit);
  }
  doit();
});

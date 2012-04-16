var argv = require('optimist')
  .default('host', 'localhost')
  .alias('h', 'host')
  .default('port', 12345)
  .alias('p', 'port')
  .argv;
var zmq = require('zmq');
var stats = require('./stats');
var address = 'tcp://' + argv.host + ':' + argv.port;

stats.clear();
stats.setTitle('ZMQ Publisher on ' + address);

var socket = zmq.socket('pub');
socket.identity = 'publisher' + process.pid;

socket.bind(address, function(err) {
  var doit = function() {
    var time = new Date().getTime();
    socket.send('TIME ' + time);
    stats.updateCounts();
    process.nextTick(doit);
  }
  doit();
});

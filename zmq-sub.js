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
stats.setTitle('ZMQ Subscriber on ' + address);

var socket = zmq.socket('sub');
socket.identity = 'subscriber' + process.pid;

socket.connect(address);
socket.subscribe('TIME');

socket.on('message', function(data) {
  var start = data.toString().replace('TIME ', '');
  stats.updateCounts();
  stats.updateLatency(new Date().getTime() - start);
});

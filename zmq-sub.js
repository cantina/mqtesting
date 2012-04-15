var zmq = require('zmq');
var stats = require('./stats');

stats.clear();
stats.setTitle('ZMQ Subscriber');

var socket = zmq.socket('sub');
socket.identity = 'subscriber' + process.pid;

socket.connect('tcp://0.0.0.0:12345');
socket.subscribe('TIME');

socket.on('message', function(data) {
  var start = data.toString().replace('TIME ', '');
  stats.updateCounts();
  stats.updateLatency(new Date().getTime() - start);
});

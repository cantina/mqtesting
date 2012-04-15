var zmq = require('zmq');
var stats = require('./stats');

stats.clear();
stats.setTitle('ZMQ Publisher');

var socket = zmq.socket('pub');
socket.identity = 'publisher' + process.pid;

socket.bind('tcp://0.0.0.0:12345', function(err) {
  if (err) throw err;

  var doit = function() {
    var time = new Date().getTime();
    socket.send('TIME ' + time);
    stats.updateCounts();
    process.nextTick(doit);
  }
  doit();
});

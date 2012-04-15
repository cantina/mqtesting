var StompClient = require('stomp-client').StompClient;
var stats = require('./stats');

stats.clear();
stats.setTitle('Apollo Publisher');

var client = new StompClient('0.0.0.0', 61613, 'admin', 'password', '1.0');

client.connect(function(sessionId) {
  var doit = function() {
    var time = new Date().getTime();
    client.publish('/queue/test', 'test');
    stats.updateCounts();
    process.nextTick(doit);
  }
  doit();
});

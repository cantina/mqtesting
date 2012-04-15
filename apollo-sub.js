var StompClient = require('stomp-client').StompClient;
var stats = require('./stats');

stats.clear();
stats.setTitle('Apollo Subscriber');

var client = new StompClient('0.0.0.0', 61613, 'admin', 'password', '1.0');

client.connect(function(sessionId) {
  client.subscribe('/queue/test', function(body, headers) {
    //console.log(body);
    stats.updateCounts();
    //stats.updateLatency(new Date().getTime() - body);
  });
});

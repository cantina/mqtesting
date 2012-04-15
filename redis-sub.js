var redis = require('redis');
var stats = require('./stats');

stats.clear();
stats.setTitle('Redis Subscriber');

var client = redis.createClient();

client.on('message', function(channel, start) {
  stats.updateCounts();
  stats.updateLatency(new Date().getTime() - start);
});

client.subscribe('test');
var redis = require('redis');
var stats = require('./stats');

stats.clear();
stats.setTitle('Redis Publisher');

var client = redis.createClient();

var doit = function() {
  var time = new Date().getTime();
  client.publish('test', time);
  stats.updateCounts();
  process.nextTick(doit);
}
doit();

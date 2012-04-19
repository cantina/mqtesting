var cantina = require('cantina-service');
var service = new cantina.Service();

var body = JSON.stringify({hello: 'world', pid: process.pid});
var headers = {
  'Content-Type': 'application/json',
  'Content-Length': body.length
};

service.reply('hello', function(req, done) {
  var res = new cantina.Response();
  res.headers = headers;
  res.body = body;
  res.code = 200;
  done(res);
});

console.log('listening...');

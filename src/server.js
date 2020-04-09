//can someone talk me through what index.js and request.js code is doing?


const http = require('http');
const fs = require('fs');
const path = require('path');
const repos = require('./repos.json');
const handler = require('./handler');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;

const server = http.createServer(handler);

server.listen(port);

console.log('server running on: http://' + host + ':' + port);

module.exports = {
  server: server,
  handler: handler
}


const http = require('http');
const fs = require('fs');
const path = require('path');
const repos = require('./repos.json');

var sendError = function (err) {
    res.writeHead(500, { 'content-type': 'text/plain' });
    res.end('server error');
}

var endPoints = {
    '/': 'fac.html',
    '/fac': 'fac.html',
    '/dwyl': 'dwyl.html',
    '/css/stylesheet.css': 'stylesheet.css',
    '/js/request.js': 'request.js',
    '/js/index.js': 'index.js',
}
var contentTypes = {
    '/': 'text/html',
    '/fac': 'text/html',
    '/dwyl': 'text/html',
    '/css/stylesheet.css': 'text/css',
    '/js/request.js': 'text/javascript',
    '/js/index.js': 'text/javascript',
}

var jsonTypes = {
    '/api/repos/fac': 'fac',
    '/api/repos/dwyl': 'dwyl'
}

var handler = (req, res) => {
    const url = req.url;

    console.log('URL: ', url);

    if (Object.keys(endPoints).indexOf(url) > -1) {
        fs.readFile(path.join(__dirname, endPoints[url]), 'utf8', (err, file) => {
            if (err) sendError(err);
            else {
                res.writeHead(200, { 'content-type': contentTypes[url] });
                res.end(file);
            }
        })
    }
    else if (Object.keys(jsonTypes).indexOf(url) > -1) {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(repos[jsonTypes[url]]));
    }
    else {
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.end('404 server error');
    }
}

module.exports = handler
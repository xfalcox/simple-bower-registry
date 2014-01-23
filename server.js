#!/usr/bin/env node
'use strict';

var express = require('express');
var fs = require('fs');

var app = express();
var packages = {};
var custom_packages = {};
var port = 3333;
var storage = './official-package-data.json';
var custom_storage = './custom-package-data.json';

if (fs.existsSync(storage)) {
	packages = JSON.parse(fs.readFileSync(storage));
	custom_packages = JSON.parse(fs.readFileSync(custom_storage));
	packages = packages.concat(custom_packages);
}

app.configure(function () {
	app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.logger());
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.listen(port, function () {
	console.log('simple-bower-registry');
	console.log('---------------------');
	console.log('            port: %d', port);
	console.log('       data file: %s', storage);
	console.log('custom data file: %s', custom_storage);
	console.log(' packages loaded: %d', Object.keys(packages).length);
});

app.get('/packages', function (request, response) {
	var result = [];
	packages.forEach(function(entry) {
		result.push({
			name: entry.name,
			url: entry.url
		});
	});
	response.send(result);
});

// TODO test this
app.post('/packages', function (request, response) {
	custom_packages.push(request.body.url);
	fs.writeFile(custom_storage, JSON.stringify(custom_packages), function (err) {
		if (err) {
			console.log('Failed to write the custom package data to disk!');
			console.log(err);
		}
	});
	response.send(201);
});


app.get('/packages/:name', function (request, response) {
	var entry = packages.filter(function(entry) {
    return entry.name === request.params.name;
  });
	if (entry.length === 0) {
		response.send(404);
	} else {
		response.send(entry[0]);
	}
});

app.get('/packages/search/:name', function (request, response) {
	var entrys = packages.filter(function(entry) {
    return entry.name.indexOf(request.params.name) !== -1;
  });
	if (entrys.length === 0) {
		response.send(404);
	} else {
		response.send(entrys);
	}
});

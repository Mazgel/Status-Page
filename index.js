//imports
const express = require("express");
const app = express();
const port = 80;
const hbs = require("express-handlebars");
const fs = require("fs");
const chalk = require("chalk");
const server = require("http").Server(app);
const { MongoClient } = require("mongodb");
const { Signale } = require("signale");
const { query } = require("express");

const signaleOptions = {
	stream: process.stdout,
	types: {
		general: {
			label: "General",
			color: "white",
			logLevel: "info",
		},
		get: {
			label: "GET",
			color: "yellow",
			logLevel: "info",
		},
		startup: {
			label: "Startup",
			color: "cyan",
			logLevel: "info",
		},
	},
};

const log = new Signale(signaleOptions);

log.config({
	displayScope: true,
	displayTimestamp: true,
	underlineLabel: true,
	uppercaseLabel: true,
	displayFilename: true,
});

connection = {
	url: "localhost",
	port: "27017",
	db: "servers",
};
url = `mongodb://${connection.url}:${connection.port}/${connection.db}`;

MongoClient.connect(url, function (err, client) {
	if (err) throw err;
});

app.post("/api/server/:server/create/", (req, res) => {
	MongoClient.connect(url, function (err, client) {
		let collection = client.db(req.params.server);

		collection.createCollection("issues", function (err, res) {
			if (err) throw err;
			console.log("Collection created!");
		});

		if (err) throw err;
		res.send("created");
	});
});

app.post("/api/server/:server/issues/create/", (req, res) => {
	MongoClient.connect(url, function (err, client) {
		datetime = new Date();
		let collection = client.db(req.params.server);
		let document = {
			date: datetime.toISOString().slice(0, 10),
			time: datetime.toISOString().slice(11, 16),
			type: req.query.type,
			description: req.query.desc,
		};
		console.log(document);
		collection.collection("issues").insertOne(document, function (err, res) {
			if (err) throw err;
			console.log("Collection created!");
		});

		if (err) throw err;
		res.send("created");
	});
});

app.get("/api/server/:server/issues/", (req, res) => {
	MongoClient.connect(url, function (err, client) {
		let collection = client.db(req.params.server);

		collection
			.collection("issues")
			.find({})
			.toArray(function (err, result) {
				if (err) throw err;
				console.log(result);
				client.close();
				res.send(result);
			});
		if (err) throw err;
	});

	console.log(req.query);
	console.log(req.params);
});

server.listen(port, () => log.startup(`Listening on port ${port}!`));

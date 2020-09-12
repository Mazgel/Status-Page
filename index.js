//imports
const express = require("express");
const app = express();
const port = 80;
const hbs = require("express-handlebars");
const fs = require("fs");
const chalk = require("chalk");
const server = require("http").Server(app);
const { Signale } = require("signale");

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

app.get("/api/server/:server/issues/", (req, res) => {
	res.send();
});

server.listen(port, () => log.startup(`Listening on port ${port}!`));

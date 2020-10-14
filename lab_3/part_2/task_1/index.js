"use strict";

class Server {
	static fs = require("fs");
	static express = require("express");
	static path = require("path");

	constructor(port = 5015) {
		this.app = Server.express();
		this.port = port;

		try {
			this.app.listen(this);
			console.log(` Starting server on port ${this.port}... `);
		} catch (error) {
			console.log(" Failure while starting server!");
			throw new Error(' Port is unavalible!');
		}
		
		this.app.use(this.getHeaders);
		this.app.use(Server.express.static(__dirname + '/static'));
		this.app.set("view engine", "hbs");
		this.app.get("/get_posts", this.getPosts);
		console.log(" Server started succesfully!");
	}

	getHeaders(request, response, next) {
		response.header("Cache-Control", "no-cache, no-store, must-revalidate");
    	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    	response.header("Access-Control-Allow-Origin", "*");
    	next();
	}

	getPosts(request, response) {
		const age = request.query.age;

		const storage_path = "data/posts.json";
		const fd = Server.fs.readFileSync(storage_path, "utf8")
		const games = JSON.parse(fd);

		const infoObject = {
			description: `Список игр, подходящих для ${age} лет`,
			suitable_games: games.filter((game) => {return game.age <= age;})
		};

		response.render("pageGames.hbs", infoObject);
		
	}
}

let server = new Server(5015);

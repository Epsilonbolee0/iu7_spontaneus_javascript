"use strict";

class Server {
	static fs = require("fs");
	static express = require("express");
	static pug = require("pug");

	constructor(port = 5015) {
		this.app = Server.express();
		this.port = port;
		try {
			this.app.listen(this.port);
			console.log(" Starting server on port " + this.port + "... ");
		} catch (error) {
			console.log(" Failure while starting server!");
			console.log(` Message: ${error.message}`);
			throw new Error('Server starting failure');
		}

		this.app.use(Server.express.static(__dirname + '/visuals'));
		this.app.get("/page", this.getPage);
		this.app.get("/get_element", this.getElement);
		console.log(" Server started succesfully!");
	}

	getElement(request, response) {
		const index = parseInt(request.query.index);

		if (isNaN(index)) {
			const contentString = Server.fs.readFileSync("public/nan.html", "utf8");
			response.end(contentString);
		} else {
			const array = JSON.parse(Server.fs.readFileSync("src/array.json", "utf8"));
			if (index < 0 || index >= array.length) {
				const contentString = Server.fs.readFileSync("public/out_of_range.html", "utf8");
				response.end(contentString);
			}
			const templateString = Server.pug.compileFile('public/result.pug');
			response.end(templateString({
				value: array[index],
				index: index
			}));
		}
	}

	getPage(request, response) {
		const nameString = request.query.p;
		if (Server.fs.existsSync(nameString)) {
			const contentString = Server.fs.readFileSync(nameString, "utf8");
			response.end(contentString);
		} else {
			const contentString = Server.fs.readFileSync("public/page_not_found.html", "utf8");
			response.end(contentString);
		}
	}

}


let server = new Server(5015);
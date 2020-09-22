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
		this.app.get("/get_dividers", this.getDividers);
		console.log(" Server started succesfully!");
	}

	static dividersOnRange(a, b, c) {
		const array = [];
		for (let number = a; number <= b; number++) {
			if (!(number % c)) {
				array.push(number);
			}
		}

		return array;
	}

	getDividers(request, response) {
		const a = parseInt(request.query.a);
		const b = parseInt(request.query.b);
		const c = parseInt(request.query.c);

		if (isNaN(a) || isNaN(b) || isNaN(c)) {
			const contentString = Server.fs.readFileSync("public/nan.html", "utf8");
			response.end(contentString);
		} else {
			if (a > b) {
				const contentString = Server.fs.readFileSync("public/invalid_range.html", "utf8");
				response.end(contentString);
			} else {
				const array = Server.dividersOnRange(a, b, c);
				console.log(array);
				if (!(array.length)) {
					const templateString = Server.pug.compileFile('public/not_found.pug');
					response.end(templateString({
					a: a,
					b: b,
					c: c
					}));
				} else {
					const templateString = Server.pug.compileFile('public/found.pug');
					response.end(templateString({
					a: a,
					b: b,
					c: c,
					array: array
					}));
				}
			}
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
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
		this.app.post("/add_record", this.addRecord);
		this.app.get("/get_record", this.getRecord);
		console.log(" Server started succesfully!");
	}

	getHeaders(request, response, next) {
		response.header("Cache-Control", "no-cache, no-store, must-revalidate");
    	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    	response.header("Access-Control-Allow-Origin", "*");
    	next();
	}


	addRecord(request, response) {
		const email = request.query.email;
		const surname = request.query.surname;
		const number = request.query.number;

		const storage_path = "data/users.json";
		const fd = Server.fs.readFileSync(storage_path, "utf8")
		let storage = fd.length ? new Map(JSON.parse(fd)) : new Map();

		function find_number(storage, number) {
			for (let value of storage.values()) {
				if (value.number == number) {
					return true;
				}
			}
			return false;
		}

		const email_exists = storage.has(email);
		const number_exists = !email_exists ? find_number(storage, number) : true;

		if (!number_exists) {
			storage.set(email, {"surname": surname, "number": number});
			Server.fs.writeFileSync(storage_path, JSON.stringify([...storage]));
			response.end(JSON.stringify({added: true}));	
		} else {
			response.end(JSON.stringify({added: false}));
		}	
	}

	getRecord(request, response) {
		const email = request.query.email;

		const storage_path = "data/users.json";
		const fd = Server.fs.readFileSync(storage_path, "utf8")
		let storage = fd.length ? new Map(JSON.parse(fd)) : new Map();

		if (!storage.has(email)) {
			response.end(JSON.stringify({found: false}));
		} else {
			const values = storage.get(email);
			response.end(JSON.stringify({found: true, surname: values.surname, number: values.number}));
		}
	}
}

let server = new Server(5015);
"use strict";

class Server {
	static express = require("express");
	static fs = require("fs");
	static hbs = require("hbs");

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
		
		const cookie_session = require("cookie-session");
		this.app.use(cookie_session({
			name: 'session',
			keys: ['hhh', 'qqq', 'vvv'],
			maxAge: 25 * 60 * 60 * 1000
		}));

		this.app.set("view engine", "hbs");
		this.app.set("views", "static/views");
		this.app.get("/api/save", this.saveCookie);
		this.app.get("/api/get", this.getCookie);
		this.app.get("/api/delete", this.deleteCookie);
		this.app.get("/get_user", this.getUser);
		this.app.get("/account", this.getAccount);
		this.app.get("/auth", this.getAuth);
		console.log(" Server started succesfully!");
	}

	getHeaders(request, response, next) {
		response.header("Cache-Control", "no-cache, no-store, must-revalidate");
    	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    	next();
	}

	saveCookie(request, response) {
		const login = request.query.login;
		const password = request.query.password;
		if (!login) return response.end(" Login is not set!");
		if (!password) return response.end(" Password is not set!");

		request.session.login = login;
		request.session.password = password;
		response.end(" Cookie set succesfully");
	}

	getCookie(request, response) {
		if (!request.session.login) return response.end(JSON.stringify({"exists" : false}));
		if (!request.session.password) return response.end(JSON.stringify({"exists" : false}));
		
		const login = request.session.login;
		const password = request.session.password;
		response.end(JSON.stringify({
			"exists": true,
			"login": login,
			"password": password
		}));
	}

	deleteCookie(request, response) {
		request.session = null;
		response.end(" Cookie deleted succesfully!");
	}

	getUser(request, response) {
		const login = request.query.login;
		const password = request.query.password

		const storage_path = "data/users.json";
		const fd = Server.fs.readFileSync(storage_path, "utf8")
		const users = new Map(JSON.parse(fd));

		if (!users.has(login) || (users.has(login) && users.get(login).password != password)) {
			response.end(JSON.stringify({found: false}));
		} else {
			const values = users.get(login);
			response.end(JSON.stringify({found: true, hobbie: values.hobbie, age: values.age}));
		}
	}

	getAccount(request, response) {
		const login = request.query.login;
		const hobbie = request.query.hobbie;
		const age = request.query.age;

		const infoObject = {
			login: login,
			hobbie: hobbie,
			age: age
		};
		response.render("account.hbs", infoObject);
	}

	getAuth(request, response) {
		response.end(Server.fs.readFileSync("static/html/auth.html", "utf8"));
	}

}

let server = new Server(5015);
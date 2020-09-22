"use strict";

// Класс сервера express
class Server {
	// Объекты используемых библиотек задаются как переменные класса
	static fs = require("fs");
	static express = require("express");
	static pug = require("pug");

	// Создание экземпляра сервера с проверкой свободности порта
	// После запуска идёт привязка маршрутов
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

		this.app.get("/page", this.getPage);
		this.app.get("/max_of_three", this.getMaxOfThree);
		console.log(" Server started succesfully!");
	}

	// Запрос максимума из трёх
	getMaxOfThree(request, response) {

		const a = parseInt(request.query.a);
		const b = parseInt(request.query.b);
		const c = parseInt(request.query.c);

		if (isNaN(a) || isNaN(b) || isNaN(c)) {
			const contentString = Server.fs.readFileSync("html/nan.html", "utf8");
			response.end(contentString);
		} else {
			const templateString = Server.pug.compileFile('html/result.pug');
			response.end(templateString({
				number: Math.max(a, b, c),
				array: [a, b, c]
			}));
		}
	}

	// Запрос на получение страницы
	getPage(request, response) {
		const nameString = request.query.p;
		if (Server.fs.existsSync(nameString)) {
			const contentString = Server.fs.readFileSync(nameString, "utf8");
			response.end(contentString);
		} else {
			const contentString = Server.fs.readFileSync("html/page_not_found.html", "utf8");
			response.end(contentString);
		}
	}

}


let server = new Server(5015);
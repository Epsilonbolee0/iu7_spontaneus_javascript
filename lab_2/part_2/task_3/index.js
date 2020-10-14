"use strict";

// Класс сервера express
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
	generateHTML(request, response) {

		const fs = require("fs");
		const readlineSync = require("readline-sync");

		const query_address = readlineSync.question(" Enter query address: ");
		const title = readlineSync.question(" Enter title: ");
		const page_header = readlineSync.question(" Enter page header: ");
		const n = parseInt(readlineSync.question(" Enter number of inputs: "));
		if (isNaN(n) || n <= 0) {
			console.log(" Invalid number of inputs!");
			return false;
		}

		const array = [];
		for (let i = 0; i < n; i++) {
			array.push(readlineSync.question(" Enter field name: "));
		}

		// Метод генерации заголовка (head)
		function generateHead(title = "Шаблонная форма") {
			let stringHTML = 
			`<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="UTF-8">\n\t<title>${title}</title>\n</head>\n`;
			return stringHTML;
		}

		// Метод генерации одного поля ввода (input)
		function generateInput(field_name) {
			let stringHTML = 
			`		<p>Введите ${field_name}</p>
			<input name="${field_name}" spellcheck="false" autocomplete="off">\n`;

			return stringHTML;
		}

		// Метод генерации тела (body)
		function generateBody(page_header, query_address, array) {
			let stringHTML = 
			`<body>\n\t<h1>${page_header}</h1>\n\t<form method = "GET" action="/${query_address}">\n`;
			for (let element of array) {
				stringHTML += generateInput(element);
			}
			stringHTML += 
			`	<br>\n\t<br>\n\t<input type = "submit" value = "Отправить запрос">\n\t</form>\n</body>\n</html>\n`
			return stringHTML;
		}

		console.log(array);
		let stringHTML = generateHead(title) + generateBody(page_header, query_address, array);
		fs.writeFileSync(path, stringHTML);
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

// Генератор HTML-файлов для набора полей ввода
function generateHTML(path = "input.html") {
	


generateHTML();
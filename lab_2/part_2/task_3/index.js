"use strict";

function generateHTML(path = "input.html") {
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

	function generateHead(title = "Шаблонная форма") {
		let stringHTML = 
		`<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="UTF-8">\n\t<title>${title}</title>\n</head>\n`;
		return stringHTML;
	}

	function generateInput(field_name) {
		let stringHTML = 
		`		<p>Введите ${field_name}</p>
		<input name="${field_name}" spellcheck="false" autocomplete="off">\n`;

		return stringHTML;
	}

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

generateHTML();
"use strict";

// Получение n и списка файлов
function getFiles(){
	const readlineSync = require('readline-sync');
	const fs = require("fs");

	const n = parseInt(readlineSync.question(" Input N: "));
	if (isNaN(n) || n < 0) {
		console.log( "Number of files is wrong!");
		return false;
	}
	console.log();

	let strings = [];

	for (let i = 0; i < n; i++) {
		const string = readlineSync.question(" Input filename: ");
		strings.push(string);
	}

	return strings;
}

// Соединение содержимого файлов и выгрузка в новый файл
function concatFiles(files) {
	const readlineSync = require('readline-sync');
	const fs = require("fs");

	let contents = "";
	const output_name = readlineSync.question(" Input output file name: ");
	let content;

	for (let file of files) {
		if (fs.existsSync(file)) {
			content = fs.readFileSync(file, "utf8");
		}
		else {
			console.error(" File is unavalible!");
			return false;
		}
		contents += content ;
	}

	fs.writeFileSync(output_name, contents + '\n');
	return true;
}

concatFiles(getFiles());

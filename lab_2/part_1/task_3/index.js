"use strict";

// Получение файлов в директории (но не во вложенных)
// Для хранения содежимого используется Map
function getFiles() {
	const fs = require("fs");
	const path = require('path');
	const readlineSync = require('readline-sync');
	
	const extension = readlineSync.question(' Enter extension: ');
	let directory = readlineSync.question(' Enter directory: ');
	console.log();

	let array;

	if (fs.existsSync(directory)) {
		array = fs.readdirSync(directory);
	}
	else {
		console.error(" Directory is not found!");
		return false;
	}

	let contents = new Map();

	// Проверка доступности каждого файла
	for (let filename of array) {
		if (filename.endsWith(extension)) {
			const path = directory + '/' + filename;
			let content;
			if (fs.existsSync(path)) {
				content =  fs.readFileSync(path, "utf8");
			} else {
				console.error(" File is unavalible!");
				return false;
			}
			contents[filename] = content;
		}
	}	
	return contents;
}

console.log(getFiles());

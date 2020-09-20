"use strict";

// Вывод путей до файлов 
function outputPaths(files) {
	files.forEach(file => console.log(file));
}

// Получение всех файлов с заданным расширением в директории (и её директориях)
function getFiles() {
	const fs = require("fs");
	const path = require('path');
	const readlineSync = require('readline-sync');
	
	const len = 10
	const extension = '.txt'
	let directory = readlineSync.question(' Enter directory: ');
	console.log();

	let files = [];
	
	// Поиск подходящих файлов в папке
	function parseDirectory(directory) {
		let array;
		if (fs.existsSync(directory)) {
			array = fs.readdirSync(directory);
		}
		else {
			console.error(" Directory is not found!");
			return false;
		}

		for (let filename of array) {
			let path = directory + '/' + filename;
			if (fs.statSync(path).isDirectory()) {
				parseDirectory(path);
			}
			else if (path.endsWith(extension)) {
				let content
				if (fs.existsSync(path)) {
					content = fs.readFileSync(path, "utf8");
				}
				else {
					console.error(" File is unavalible!");
					return false;
				}
				if (content.length <= len) {
					files.push(path);
				}
			}
		}
	}

	parseDirectory(directory);
	return files;
}

outputPaths(getFiles());
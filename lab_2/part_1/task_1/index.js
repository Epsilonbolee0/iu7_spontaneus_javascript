"use strict";

// Чтение массива чисел с клавиатуры, вывод в формате JSON в файл всех чётных по длине
function readArray(filename = "result.txt") {
	const readlineSync = require('readline-sync');
	const fs = require("fs");

	const n = parseInt(readlineSync.question(" Input N: "));
	if (isNaN(n) || n < 0) {
		console.log( " Number of files is wrong!");
		return false;
	}
	console.log();

	let string;
	let array = [];

	for (let i = 0; i < n; i++) {
		string = readlineSync.question(" Input string: ");
		if (!(string.length % 2)) {
			array.push(string);
			}
		}
	console.log();

	const jsonString = JSON.stringify(array);
	fs.writeFileSync(filename, jsonString);

	return true;
}
	
readArray();


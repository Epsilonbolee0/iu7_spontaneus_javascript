"use strict";

// Получение дескриптора файла
// Если честно, выносить толку мало
function getFileDescriptor(filename = "data.txt") {
	const fs = require("fs");
	return fs.existsSync(filename) ? fs.readFileSync(filename, "utf8") : null;
}

// Проверка нахождения гласной в строке
// Гласные - строчные гласные кириллицы
function containsVowel(string) {
	let vowels = 'еаоэяиюёуы';
	let result = false;

	for (let symbol of string) {
		for (let vowel of vowels) {
			if (symbol == vowel) {
				result = true;
				break;
			}
		}
	}
	return result;
} 

// Вывод слов с гласными из файла
function outputWithVowels(filename = "data.txt") {
	let array = JSON.parse(getFileDescriptor(filename));
	if (!array){
		return false;
	}
	for (let string of array) {
		if (containsVowel(string)) {
			console.log(string);
		}
	}
}


outputWithVowels();
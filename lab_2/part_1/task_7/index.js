"use strict";

// Получение случайного целого числа в диапазоне
function randInt(min, max) {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}

// Генерации бинарного дерева и запись в формате JSON в файл
function generateTree(filename = 'tree.txt') {
	const fs = require('fs');
	const readLineSync = require('readline-sync');
	const symbols = "QWERTYUIOPASDFGHJKLZXCVBNM";

	// Рекурсивное создание ветки дерева
	function generateBranch() {
		let branches = randInt(0, 2);
		let tree = {"value": symbols[randInt(0, symbols.length - 1)]};
		
		if (branches >= 1) {
			tree["left"] = generateBranch();
		}
		if (branches == 2) {
			tree["right"] = generateBranch();
		}

		return tree;
	}

	const string = JSON.stringify(generateBranch(), null, '    ');
	fs.writeFileSync(filename, string);
}


// Получение бинарного дерева из файла
function parseTree() {
	const fs = require('fs');
	const readLineSync = require('readline-sync');

	const filename = readLineSync.question(" Enter filename: ");
	let content;
	let tree;

	if (fs.existsSync(filename)){
		content = fs.readFileSync(filename, "utf8");
	}
	else {
		console.error(" File is unavalible!");
		return false;
	}

	try {
		tree = JSON.parse(content); 
	}
	catch (error) {
		console.error(" File doesn't contain JSON!");
		return false;
	}

	return tree;
}

// Получение максимального пути в бинарном дереве
function getMaxTrace(tree) {

		if (!tree)
			return "";

		if (!tree["left"] && !tree["right"])
			return tree["value"];

		let left = getMaxTrace(tree["left"]);
		let right = getMaxTrace(tree["right"]);
		return tree["value"] + ((left.length > right.length) ? left : right);
}


function main() {
	generateTree();
	let tree = parseTree();
	if (tree) {
		let max_trace = getMaxTrace(tree)
		console.log(" Tree: ");
		console.log(tree);
		console.log(" Max trace: " + max_trace);
		console.log(" Max depth: " + max_trace.length);
	}
}

main();
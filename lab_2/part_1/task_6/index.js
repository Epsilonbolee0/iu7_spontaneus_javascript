"use strict";

// Добавление в объекта в качестве поля в другой объект
function wrapObject(object) {
	let new_object = {};
	new_object["value"] = object;
	return new_object;
}

// Поиск максимальной возможной вложенности JSON
// При превышении вложенности "бросается" ошибка переполнения кучи
// Дерево с максимально возможной вложенностью записывается в файл
function getMaxNesting(dumping_file = "nesting.txt") {
	const fs = require('fs');
	let object = {value: 'Я очень глубоко!'};
	let value = 0;
	let string;

	while (true) {
		try {
			string = JSON.stringify(object);
		} catch(error) {
			console.log(" Max nesting is " + (value - 1) + "!");
			console.log(" Resulting JSON is dumped into " + dumping_file + "!");
			fs.writeFileSync(dumping_file, string);
			break;
		}
		object = wrapObject(object);
		value++;
	}
}

getMaxNesting();
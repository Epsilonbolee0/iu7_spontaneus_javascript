"use strict";

// База детей - обёртка над массивом.
// Лучше использовать Map.
class Base{
	constructor() {
		this.kids = [];
	}

	// Получение записи о ребёнке 
	read(surname) {
		let result = null;
		for (let i = 0; i < this.kids.length && !result; i++) {
			if (this.kids[i]["surname"] == surname) {
				result = this.kids[i];
			}
		}

		return result;
	}

	// Добавление ребёнка в список
	add(surname, age) {
		let kid = {};
		kid["surname"] = surname;
		kid["age"] = age;

		if (!this.read(surname) && age >= 0) {
			this.kids.push(kid);
		}
	}

	// Удаление ребёнка из списка
	delete(surname) {
		for (let i = 0; i < this.kids.length; i++) {
			if (surname == this.kids[i]["surname"]) {
				this.kids.splice(i, 1);
			}
		}
	}

	// Обновление возраста ребёнка
	updateAge(surname, newAge) {
		let kid = this.read(surname);
		if (kid) {
			kid["age"] = newAge;
		}
	}

	// Обновление фамилии ребёнка
	updateSurname(surname, newSurname) {
		let kid = this.read(surname);
		if (kid) {
			let tempKid = this.read(newSurname);
			if (!tempKid) {
				kid["surname"] = newSurname;
			}
		}
	}

	// Вывод детей с использованием стрелочной функции
	// Не всегда хорошо, так как стрелочные функции меняют контекст
	print() {
		this.kids.forEach(kid => console.log(kid));
	}

	// Получение среднего возраста детей
	getAverage() {
		let sum = 0;
		for (let i = 0; i < this.kids.length; i++) {
			sum += this.kids[i]["age"];
		}
		return (this.kids.length != 0) ? parseInt(sum / this.kids.length) : null; 
	}

	// Поиск самого "старого" ребёнка
	// Подразумевается, что можно вернуть любого из старших детей
	getOldest() {
		if (!this.kids.length)
			return null;

		let maxAge = this.kids[0]["age"];
		let kid = this.kids[0];

		for (let i = 0; i < this.kids.length; i++) {
			if (this.kids[i]["age"] > maxAge) {
				maxAge = this.kids[i]["age"];
				kid = this.kids[i];
			}
		}

		return kid;
 	}

 	// Поиск детей, чей возраст находится в заданном диапазоне
 	getInRange(min, max) {
 		if (max < min)
			return [];

		let resultingArray = [];
		for (let i = 0; i < this.kids.length; i++) {
			if (this.kids[i]["age"] >= min && this.kids[i]["age"] <= max)
				resultingArray.push(this.kids[i]);
		}

		return resultingArray;
 	}

 	// Поиск детей, чьи имена начинаются с определённой буквы
 	getStartingWith(letter) {
 		let resultingArray = [];
 		for (let i = 0; i < this.kids.length; i++) {
 			let string = this.kids[i]["surname"];
 			if (string.charAt(0) == letter) {
 				resultingArray.push(this.kids[i]);
 			}
 		}

 		return resultingArray;
 	}

 	// Поиск детей, чьи имена длиннее заданной величины
 	getLongerThan(length) {
		let resultingArray = [];
 		for (let i = 0; i < this.kids.length; i++) {
 			let string = this.kids[i]["surname"];
 			if (string.length > length) {
 				resultingArray.push(this.kids[i]);
 			}
 		}

 		return resultingArray; 		
 	}

 	// Поиск детей, чьи имена начинаются с гласных
 	// Гласными буквами считаются только буквы кириллицы
 	getStartingWithVowel() {
		let resultingArray = [];
		let vowels = "яиюэоаеуЯИЮЭОАЕУ";

 		for (let i = 0; i < this.kids.length; i++) {
 			let string = this.kids[i]["surname"];
 			let startsWithVowel = false;
 			for (let j = 0; j < vowels.length; j++) {
 				if (string.charAt(0) == vowels[j]) {
 					resultingArray.push(this.kids[i]);
 					break;
 				} 			
 			}
 		}

 		return resultingArray; 
 	}
}

// Проверка работоспособности базовых функций
function testCRUD() {

	let base = new Base();
	console.log("Проверка добавления: ");
	base.add("Стасик", 14);
	base.add("Дэнчик", 26);
	base.print();
	console.log("\n");

	console.log("Проверка обновления: ");
	base.updateSurname("Стасик", "Стасянчик");
	base.updateAge("Дэнчик", 27);
	base.updateSurname("Дэнчик", "Стасянчик");
	base.print();
	console.log("\n");

	console.log("Проверка удаления: ");
	base.delete("Стасянчик");
	base.delete("Игорян");
	base.print();
	console.log("\n");
}

// Проверка более точечных запросов
function testQueries() {
	let base = new Base();
	base.add("Сучков", 15);
	base.add("Антоненко", 99);
	base.add("Сугой-декай", 3);
	base.add("Алин", 189);
	base.add("Стерлигов", 50);
	console.log("База для проверки запросов: ");
	base.print();
	console.log();

	console.log("Средний возраст: ");
	console.log(base.getAverage());
	console.log();

	console.log("Самый старший:");
	console.log(base.getOldest());
	console.log();

	console.log("От 10 до 50: ");
	console.log(base.getInRange(10, 50));
	console.log();

	console.log("Больше 10 букв: ");
	console.log(base.getLongerThan(10));
	console.log();

	console.log("Начинающиеся с буквы С: ");
	console.log(base.getStartingWith('С'));
	console.log();

	console.log("Начинающиеся с гласной: ");
	console.log(base.getStartingWithVowel());
	console.log();
}

function main() {
	testCRUD();
	testQueries();
}

main();
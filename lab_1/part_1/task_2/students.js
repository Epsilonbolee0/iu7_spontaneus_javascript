"use strict";

// База студента - обёртка над массивом.
class Base {
	constructor() {
		this.students = [];
	}

	// Добавление в базу студента
	add(group, card_id, coding_marks) {
		let student = {};
		student["group"] = group;
		student["card_id"] = card_id;
		student["coding_marks"] = coding_marks;

		if (!this.read(card_id)) {
			this.students.push(student);
		}
	}

	// Чтение записи о студенте
	read(card_id) {
		let result = null;
		for (let student of this.students) {
			if (student["card_id"] == card_id) {
				result = student;
				break;
			}
		}

		return result;
	}

	// Обновление группы студента
	updateGroup(card_id, newGroup) {
		let student = this.read(card_id);
		if (student) {
			student["group"] = newGroup;
		}
	}

	// Обновление оценок студента
	updateMarks(card_id, newMarks) {
		let student = this.read(card_id);
		if (student) {
			student["coding_marks"] = newMarks;
		}
	}

	// Добавление оценок студенту
	addMark(card_id, newMark) {
		let student = this.read(card_id);
		if (student) {
			student["coding_marks"].push(newMark);
		}
	}

	// Обновление id студента
	updateId(card_id, newId) {
		let student = this.read(card_id);
		if (student) {
			let temp = this.read(newId);
			if (!temp) {
				student["card_id"] = newId;
			}
		}
	}

	// Удаление студента по id
	delete(card_id) {
		for (let i = 0; i < this.students.length; i++) {
			if (card_id == this.students[i]["card_id"]) {
				this.students.splice(i, 1);
			}
		}
	}

	// Вывод студентов с использованием стрелочной функции
	// Не всегда хорошо, так как стрелочные функции меняют контекст
	print(card_id) {
		this.students.forEach(student => console.log(student));
	}

	// Получение средней оценки студента
	getAverage(card_id) {
		let student = this.read(card_id);
		if (!student) {
			return null;
		}

		let sum = 0;
		student["coding_marks"].forEach(mark => sum += mark);
		return student["coding_marks"].length ? 
		sum / student["coding_marks"].length : null;
	}

	// Получение всех студентов группы
	getGroup(group) {
		let resultingArray = [];
		for (var student of this.students) {
			if (student["group"] == group) {
				resultingArray.push(student);
			}
		}
		return resultingArray;
	}

	// Получение максимального количества оценок
	// Подразумевается, что максимум может быть только один
	getMaxMarks(group) {
		let count = 0;
		let result;
		let repeats;

		for (var student of this.students) {
			if (student["group"] == group) {
				let marks_num = student["coding_marks"].length; 
				if (marks_num > count) {
					result = student;
					count = marks_num;
					repeats = 1;
				}
				else if (marks_num == count) {
					repeats++;
				}
			}
		}

		return (repeats == 1) ? result: null;
	}

	// Поиск прогульщика 
	// Подразумевается, что прогульщик не имеет оценок 
	getTruant() {
		let result = null;
		for (var student of this.students) {
			if (!student["coding_marks"].length) {
				result = student;
				break;
			}
		}
		return result;
	}
}

// Тест базового функционала
function testCRUD() {
	let base = new Base();
	console.log("Проверка добавления: ");
	base.add("ИУ7-52Б", 12, [5, 3, 4, 3]);
	base.add("ИУ7-53Б", 15, []);
	base.print();
	console.log();

	console.log("Проверка обновления: ");
	base.updateGroup("ИУ7-52Б", "ИУ7-62Б");
	base.updateId(12, 13);
	base.updateId(15, 13); // Не пройдёт
	base.updateMarks(15, [2]);
	base.addMark(15, 3);
	base.print();
	console.log();

	console.log("Проверка удаления: ");
	base.delete("ИУ7-62Б");
	base.delete("Э3-25Б");
	base.print();
	console.log();
}

// Тест работоспособности запросов
function testQueries() {
	let base = new Base();
	base.add("ИУ7-52Б", 12, [5, 3, 4, 3]);
	base.add("ИУ7-53Б", 15, []);
	base.add("ИУ7-52Б", 7, [5, 4]);
	base.add("ИУ7-54Б", 16, [3, 3, 3, 5, 3, 4, 5, 2, 3, 5]);
	console.log("База для проверки запросов: ");
	base.print();

	console.log("Средняя оценка для 12-го: ");
	console.log(base.getAverage(12));
	console.log("Средняя оценка для 15-го (прогульщик): ");
	console.log(base.getAverage(15));
	console.log();

	console.log("Информация о 52-ой группе: ");
	console.log(base.getGroup("ИУ7-52Б"));

	console.log("Студент с максимумом оценок в группе 52: ");
	console.log(base.getMaxMarks("ИУ7-52Б"));

	console.log("Прогульщик: ");
	console.log(base.getTruant());
	console.log();
}

function main() {
	testCRUD();
	testQueries();
}

main();
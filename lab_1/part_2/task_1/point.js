"use strict";

// Класс точки
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	print() {
		console.log("(" + this.x + ";" + this.y + ")");
	}
}

// Класс, в который вынесены математические операции
class MathHelper {
	constructor() {}
	static sqr = value => value * value;
	static distance = (start, finish) => 
	Math.sqrt(MathHelper.sqr(finish["x"] - start["x"]) +
   			  MathHelper.sqr(finish["y"] - start["y"]));
}

//Класс отрезка
class Section {
	constructor(x1, y1, x2, y2) {
		this.start = new Point(x1, y1);
		this.finish = new Point(x2, y2);
	}

	print() {
		console.log("Начало отрезка: ") + this.start.print();
		console.log("Конец отрезка: ") + this.finish.print();
	}

	// Длина отрезка
	length() {
		return MathHelper.distance(this.start, this.finish);
	}
}

// Тесты, что же ещё?
function test() {
	let a = new Point(0, 0);
	let b = new Point(4, 3);
	let ab = new Section(0, 0, 4, 3);

	console.log("Проверка печати: ");
	console.log("A: ") + a.print();
	console.log("B: ") + b.print();
	console.log("AB: ") + ab.print();
	console.log("Длина AB: " + ab.length());
	console.log("\n");
}

test();
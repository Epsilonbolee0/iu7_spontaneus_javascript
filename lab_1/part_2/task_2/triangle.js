"use strict";

// Класс треугольника
class Triangle {
	constructor(a, b, c) {
		this.a = a;
		this.b = b;
		this.c = c;
	}

	// Проверка существования треугольника
	exists() {
		return ((this.a + this.b > this.c) && 
				(this.b + this.c > this.a) && 
				(this.a + this.c > this.b));
	}

	// Поиск периметра треугольника
	perimeter() {
		return this.a + this.b + this.c;
	}

	// Поиск площади треугольника по формуле Герона
	area() {
		let p = this.perimeter() / 2;
		return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
	}

	// Проверка прямоугольности треугольника по обратной теореме Пифагора
	static sqr = value => value * value;
	isRectangular() {
		return (Triangle.sqr(this.a) + Triangle.sqr(this.b) == Triangle.sqr(this.c) ||
				Triangle.sqr(this.a) + Triangle.sqr(this.c) == Triangle.sqr(this.b) ||
				Triangle.sqr(this.c) + Triangle.sqr(this.b) == Triangle.sqr(this.a));
	}

	print() {
		console.log("Стороны: " + this.a + " " + this.b + " " + this.c);
	}
}

function test() {
	let a = new Triangle(3, 5, 4);
	let b = new Triangle(3, 5, 10);
	let c = new Triangle(3, 3, 4);

	console.log("Треугольники для проверки: ");
	console.log("A: ") + a.print();
	console.log("B: ") + b.print();
	console.log("C: ") + c.print();
	console.log();

	console.log("Существует ли (3, 5, 4)? ");
	a.exists() ? console.log("Да!") : console.log("Нет!");
	console.log("Существует ли (3, 5, 10)? ");
	b.exists() ? console.log("Да!") : console.log("Нет!");
	console.log();

	console.log("Периметр для C: " + c.perimeter());
	console.log("Площадь для A: " + a.area());
	console.log();

	console.log("Прямоугольный ли (3, 5, 4)? ");
	a.isRectangular() ? console.log("Да!") : console.log("Нет!");
	console.log("Прямоугольный ли (3, 3, 4)? ");
	b.isRectangular() ? console.log("Да!") : console.log("Нет!");
	console.log();
}


test();
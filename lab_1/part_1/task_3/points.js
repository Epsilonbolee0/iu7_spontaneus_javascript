"use strict"

// Опять же, база - обёртка над списком
class Base {
	constructor() {
		this.points = [];
	}

	// Добавление в список точек
	add(name, x, y) {
		let point = {};
		point["name"] = name;
		point["x"] = x;
		point["y"] = y;

		if (!this.read(name)) {
			this.points.push(point);
		}
	}

 	// Получение по названию
	read(name) {
		let result = null;
		for (let point of this.points) {
			if (point["name"] == name) {
				result = point;
				break;
			}
		}

		return result;
	}

	// Обновление X
	updateX(name, newX) {
		let point = this.read(name);
		if (point) {
			point["x"] = newX;
		}
	}

	// Обновление Y
	updateY(name, newY) {
		let point = this.read(name);
		if (point) {
			point["y"] = newY;
		}
	}

	// Обновление названия точки
	updateName(name, newName) {
		let point = this.read(name);
		if (point) {
			let temp = this.read(newName);
			if (!temp) {
				point["name"] = newName;
			}
		}
	}

	// Удаление точки
	delete(name) {
		for (let i = 0; i < this.points.length; i++) {
			if (this.points[i]["name"] == name) {
				this.points.splice(i, 1);
			}
		}
	}

	// Вывод точек, стрелочки меняют контекст
	print() {
		this.points.forEach(point => console.log(point));
	}

	// Методы КЛАССА для упрощения вычислений
	static sqr = value => value * value;
	static dist_squared = (start, finish) => 
	Base.sqr(finish["x"] - start["x"]) + 
	Base.sqr(finish["y"] - start["y"]);

	// Поиск точек, находящихся на максимальном расстоянии друг от друга
	getMaxDistance() {
		let max = 0;
		let pair = {};

		for (let start of this.points) {
			for (let finish of this.points) {
				let criteria = Base.dist_squared(start, finish);
				if (max < criteria) {
					max = criteria;
					pair["start"] = start;
					pair["finish"] = finish;
				}
			}
		}

		return (pair["start"] != pair["finish"]) ? pair : null;
	}

	// Поиск точек, лежащих внутри окружности
	getInsideCircle(center, radius) {
		if (radius < 0) {
			return [];
		}

		let resulting_array = [];
		for (let point of this.points) {
			if (Base.dist_squared(center, point) <= Base.sqr(radius)) {
				resulting_array.push(point);
			}
		}

		return resulting_array;
	}

	// Методы КЛАССА для определения положения точки относительно осей координат
	static isAbove = (center, point) => point["y"] > center["y"];
	static isBelow = (center, point) => point["y"] < center["y"];
	static isRecto = (center, point) => point["x"] > center["x"];
	static isLeftwards = (center, point) => point["x"] < center["x"];

	// Получение точек по описанным выше критериям (критерий передаётся)
	getPoints(center, criteria) {
		let resulting_array = [];

		for (let point of this.points) {
			if (criteria(center, point)) {
				resulting_array.push(point);
			}
		}

		return resulting_array;
	}

	// Конкретные методы для поиска точек по положению
	getAboveAxis(center) {
		return this.getPoints(center, Base.isAbove);
	}

	getBelowAxis(center) {
		return this.getPoints(center, Base.isBelow);
	}

	getRectoAxis(center) {
		return this.getPoints(center, Base.isRecto);
	}

	getLeftwardsAxis(center) {
		return this.getPoints(center, Base.isLeftwards);
	}

	// Поиск точек внутри прямоугольника
	// Стороны прямоугольника параллельны осям координат
	getInRectangle(a, b, c, d) {
		let inRectangle = [];
		for (let point of this.points) {
			if (Base.isAbove(a, point) && 
				Base.isBelow(c, point) && 
				Base.isRecto(b, point) && 
				Base.isLeftwards(d, point)) {
				inRectangle.push(point);
			}
		}

		return inRectangle;
	}
}

// Тест базового функционала
function testCRUD() {
	let base = new Base();
	console.log("Проверка добавления: ");
	base.add("A", 12, 13);
	base.add("B", -90, -90);
	base.print();
	console.log();

	console.log("Проверка обновления: ");
	base.updateName("A", "A'");
	base.updateX("A'", 13);
	base.updateY("B", 90);
	base.print();
	console.log();

	console.log("Проверка удаления: ");
	base.delete("A'");
	base.print();
	console.log();
}

// Тест методов
function testQueries() {

	let zero = {"x" : 0, "y" : 0};
	let base = new Base();
	base.add("A", 4, -2);
	base.add("B", 1, 1);
	base.add("C", -6, 3);
	base.add("D", 0, -5);
	console.log("База для проверки запросов: ");
	base.print();
	console.log();

	console.log("Максимально удалённые друг от друга точки: ");
	console.log(base.getMaxDistance());
	console.log();

	console.log("Точки, не дальше от (0; 0) чем на 5 ");
	console.log(base.getInsideCircle(zero, 5));
	console.log()

	console.log("Выше OX: ");
	console.log(base.getAboveAxis(zero));
	console.log();

	console.log("Ниже OX: ");
	console.log(base.getBelowAxis(zero));
	console.log();

	console.log("Правее OY: ");
	console.log(base.getRectoAxis(zero));
	console.log();

	console.log("Левее OY: ");
	console.log(base.getLeftwardsAxis(zero));
	console.log();

	let d = {"x" : 0, "y" : -5};
	let e = {"x" : 0, "y" : 5};
	let f = {"x" : 10, "y" : 5};
	let g = {"x" : 10, "y" : -5};

	console.log("Внутри прямоугольника: ");
	console.log(base.getInRectangle(d, e, f, g));
	console.log("\n");
}


function main() {
	testCRUD();
	testQueries();
}

main();
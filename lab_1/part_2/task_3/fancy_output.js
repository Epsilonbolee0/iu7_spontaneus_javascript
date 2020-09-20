"use strict";

const time_1 = 2000;
const time_2 = 1000;

const limit_1 = 10;
const limit_2 = 20;

let number = 0;

// Используется рекурсивный setTimeout для динамического интервала между выводом
function tick() {
	console.log(number++);
	if (number > limit_2) {
		number = 0;
	}

	if (number <= limit_1) {
		timer = setTimeout(tick, time_1);
	}
  	else if (number <= limit_2) {
  		timer = setTimeout(tick, time_2);
  	}
}


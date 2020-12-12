// Basic math functions
function add(a, b) {
	return +a + +b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

// Rakes 2 numbers and an operator and displays the answer
function operate(a, operator, b) {
	if (operation) {
		if (!a) {
			a = lastAnswer;
			firstNumber = lastAnswer;
			changeDisplay(firstNumber);
		}
		if (b) {
			let answer = '';
			switch(operator) {
				case "add":
					answer = add(a, b);
					break;
				case "subtract":
					answer = subtract(a, b);
					break;
				case "multiply":
					answer = multiply(a, b);
					break;
				case "divide":
					answer = divide(a, b);
					break;
				default:
					answer = '';
			}
			answer = ((Math.round((answer + Number.EPSILON) * 10000000000) / 10000000000)).toString().slice(0, 11);
			changeDisplay(answer);
			lastAnswer = `${answer}`; // Sets the answer as the first number for chained operations inputs
			firstNumber = '';
			secondNumber = '';
			operation = '';
			console.log(answer);
		};
	}
}

// Changes the display to the input provided
function changeDisplay(num) {
	displayValue = (num == Infinity) ? 'Undefined' : num // Checks for division by zero
	display.textContent = displayValue
	console.log(firstNumber, operation, secondNumber);
}

// Saves the number inputed as either the first or second number
function saveNumber(num) {
	if (displayValue.toString().length <= 11) {
		if (!operation) {
			return firstNumber += ((Math.round((num + Number.EPSILON) * 10000000000) / 10000000000)).toString().slice(0, 11);
		} else {
			return secondNumber += ((Math.round((num + Number.EPSILON) * 10000000000) / 10000000000)).toString().slice(0, 11);
		}
	}
	return !operation ? firstNumber : secondNumber;
}

// "Backspace" button which deletes the last number
function deleteNumber() {
	if (!operation) {
		return firstNumber = firstNumber.slice(0, firstNumber.length - 1);
	} else {
		return secondNumber = secondNumber.slice(0, secondNumber.length - 1);
	}
}

// Converts the current number to a negative
function negative() {
	if (!firstNumber) {
		firstNumber = lastAnswer;
	}
	if (!operation) {
		return firstNumber == '' ? firstNumber = '-' : firstNumber *= -1;
	} else {
		return secondNumber == '' ? secondNumber = '-' : secondNumber *= -1;
	} 
}

// Adds a decimal only if the number does not already have a decimal
function savePeriod(num) {
	if (!operation) {
		if (firstNumber.indexOf('.') == -1) {
			firstNumber += num;
		}
		return firstNumber;
	} else {
		if (secondNumber.indexOf('.') == -1) {
			secondNumber += num;
		}
		return secondNumber;
	}
}

// Fully clears the display and history
function clearDisplay() {
	display.textContent = '';
	displayValue = '';
	firstNumber = '';
	operation = '';
	secondNumber = '';
	lastAnswer = '';
}

let display = document.querySelector(".display");
let displayValue = '';
let operation = '';
let firstNumber = '';
let secondNumber = '';
let lastAnswer = '';

// Event listeners for all buttons

const clear = document.querySelector('#clear');
clear.addEventListener('click', clearDisplay);

const backspace = document.querySelector('#backspace');
backspace.addEventListener('click', () => changeDisplay(deleteNumber()));

const negativeButton = document.querySelector('#negative');
negativeButton.addEventListener('click', () => changeDisplay(negative()));

const numbers = [];
for (let i = 0; i < 10; i++) {
	numbers[i] = document.querySelector(`[id = ${CSS.escape(i)}]`);
	numbers[i].addEventListener('click', () => changeDisplay(saveNumber(i)));
	window.addEventListener('keydown', (e) => {
		if (e.key == i) {changeDisplay(saveNumber(i))}
	})
}

const periodButton = document.querySelector("#period");
periodButton.addEventListener('click', () => changeDisplay(savePeriod('.')));

const addButton = document.querySelector("#add");
addButton.addEventListener('click', () => {
	operate(firstNumber, operation, secondNumber);
	operation = 'add';
});

const subtractButton = document.querySelector("#subtract");
subtractButton.addEventListener('click', () => {
	operate(firstNumber, operation, secondNumber);
	operation = 'subtract';
});

const multiplyButton = document.querySelector("#multiply");
multiplyButton.addEventListener('click', () => {
	operate(firstNumber, operation, secondNumber);
	operation = 'multiply';
});

const divideButton = document.querySelector("#divide");
divideButton.addEventListener('click', () => {
	operate(firstNumber, operation, secondNumber);
	operation = 'divide';
});

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener('click', () => operate(firstNumber, operation, secondNumber));

// Keyboard support for all keys excluding +/-
window.addEventListener('keydown', (e) => {
	if (e.key == 'Escape') {
		clearDisplay();
	} else if (e.key == 'Backspace' || e.key == 'Delete') {
		changeDisplay(deleteNumber());
	} else if (e.key == '.') {
		changeDisplay(savePeriod('.'));
	} else if (e.key == '+') {
		operate(firstNumber, operation, secondNumber);
		operation = 'add';
	} else if (e.key == '-') {
		operate(firstNumber, operation, secondNumber);
		operation = 'subtract';
	} else if (e.key == '*') {
		operate(firstNumber, operation, secondNumber);
		operation = 'multiply';
	} else if (e.key == '/') {
		operate(firstNumber, operation, secondNumber);
		operation = 'divide';
	} else if (e.key == 'Enter' || e.key == '=') {
		operate(firstNumber, operation, secondNumber);
	}
})
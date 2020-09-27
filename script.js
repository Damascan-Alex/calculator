const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const clearBtns = document.querySelectorAll('.clear-btn')
const decimalBtn = document.getElementById('decimal')
const resultBtn = document.getElementById('result')
const display = document.getElementById('display')
const invertBtn = document.getElementById('invert')

let MemoryCurrentNumber = 0
let MemoryNewNumber = false
let MemoryPendingOperations = ''

// Here we do loop because it have many numbers
for (let i = 0; i < numbers.length; i++) {
	const number = numbers[i]
	number.addEventListener('click', function (e) {
		numberPress(e.target.innerText)
	})
}

for (let i = 0; i < operators.length; i++) {
	const operatorBtn = operators[i]
	operatorBtn.addEventListener('click', function (e) {
		operations(e.target.innerText)

	})
}

for (let i = 0; i < clearBtns.length; i++) {
	const clearButton = clearBtns[i]
	clearButton.addEventListener('click', function (e) {
		clear(e.target.id)
	})
}

decimalBtn.addEventListener('click', function (e) {
	decimal(e.target.id)
})

// Functions

function numberPress(number) {
	if (MemoryNewNumber) {
		display.value = number
		MemoryNewNumber = false
	} else {
		if (display.value === '0') {
			display.value = number //if is 0 it will add number instead, compare with string
		} else {
			display.value += number // will add one more number
		}
	}
}

function operations(operator) {
	let localOperationsMemory = display.value

	if (MemoryNewNumber && MemoryPendingOperations !== '=') {
		display.value = MemoryCurrentNumber
	} else if (operator === '+/-') {
		MemoryCurrentNumber = 0 - (+localOperationsMemory)
	} else if (operator === '√') {
		MemoryCurrentNumber = Math.sqrt(+localOperationsMemory)
	} else {
		MemoryNewNumber = true
		if (MemoryPendingOperations === '+') {
			MemoryCurrentNumber += +localOperationsMemory
		} else if (MemoryPendingOperations === '-') {
			MemoryCurrentNumber -= +localOperationsMemory
		} else if (MemoryPendingOperations === '*') {
			MemoryCurrentNumber *= +localOperationsMemory
		} else if (MemoryPendingOperations === '/') {
			MemoryCurrentNumber /= +localOperationsMemory
		}
		else if (MemoryPendingOperations === 'X^') {

			MemoryCurrentNumber = Math.pow(+MemoryCurrentNumber, localOperationsMemory)
		}
		else {
			MemoryCurrentNumber = +localOperationsMemory
		}
		display.value = MemoryCurrentNumber
		MemoryPendingOperations = operator
	}
	display.value = MemoryCurrentNumber
}

function decimal(argument) {
	debugger
	let localDecimalMemory = display.value

	if (MemoryNewNumber) {
		localDecimalMemory = '0.'
		MemoryNewNumber = false
	} else {
		if (localDecimalMemory.indexOf('.') === -1) {
			localDecimalMemory += '.'
		}
	}
	display.value = localDecimalMemory
}

function clear(id) {
	if (id === 'ce') {
		display.value = '0'
		MemoryNewNumber = true
	} else if (id === 'c') {
		display.value = '0'
		MemoryNewNumber = true
		MemoryCurrentNumber = 0
		MemoryPendingOperations = ''
	}
}

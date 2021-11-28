class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previosOperand !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    clear() {
        this.currentOperand = '';
        this.previosOperand = '';
        this.operation = undefined;
    }

    calculate() {
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        let result;
        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case 'x':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.previosOperand = '';
        this.operation = undefined;
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('.js-data-number');
const operationButtons = document.querySelectorAll('.js-data-operation');
const equalsButton = document.querySelector('.js-data-equals');
const deleteButton = document.querySelector('.js-data-delete');
const clearAllButton = document.querySelector('.js-data-clear-all');

const previousOperandTextElement = document.querySelector('js-data-previous-operand');
const currentOperandTextElement = document.querySelector('js-data-current-operand');

let myCalculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        myCalculator.appendNumber(button.innerText);
        myCalculator.updateDisplay();
        console.log('numberButton');
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        myCalculator.chooseOperation(button.innerText);
        myCalculator.updateDisplay();
        console.log('operationButton');
    });
});

equalsButton.addEventListener('click', () => {
    myCalculator.calculate();
    myCalculator.updateDisplay();
    console.log('equalsButton');
});

deleteButton.addEventListener('click', () => {
    myCalculator.delete();
    myCalculator.updateDisplay();
    console.log('deleteButton');
});

clearAllButton.addEventListener('click', () => {
    myCalculator.clear();
    myCalculator.updateDisplay();
    console.log('clearAllButton');
});

class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {

        this._previousOperandTextElement = previousOperandTextElement;
        this._currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    appendNumber(number) {
        if (number === ',' && this._currentOperand.includes('.')) return;
        this._currentOperand = this._currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this._previosOperand !== '') {
            this.calculate();
            this._operation = operation;
            this._previousOperand = this._currentOperand;
            this._currentOperand = '';
        }
    }

    delete() {
        this._currentOperand = this._currentOperand.toString().slice(0, -1);
    }

    clear() {
        this._currentOperand = '';
        this._previousOperand = '';
        this._operation = undefined;
    }

    calculate() {
        const prev = parseFloat(this._previousOperand);
        const current = parseFloat(this._currentOperand);
        let result;
        if (isNaN(prev) || isNaN(current)) return;
        switch (this._operation) {
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
        this._currentOperand = result;
        this._previosOperand = '';
        this._operation = undefined;
    }

    _getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('es', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this._currentOperandTextElement.innerText = this._currentOperand;
        if (this._operation != null) {
            this._previousOperandTextElement.innerText = `${this._getDisplayNumber(this._previousOperand)} ${this._operation}`;
        } else {
            this._previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('.ux-data-number');
const operationButtons = document.querySelectorAll('.ux-data-operation');

const equalsButton = document.querySelector('.ux-data-equals');
const deleteButton = document.querySelector('.ux-data-delete');
const clearAllButton = document.querySelector('.ux-data-clear-all');

const previousOperandTextElement = document.querySelector('.ux-data-previous-operand');
const currentOperandTextElement = document.querySelector('.ux-data-current-operand');

const calculadora = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.appendNumber(button.innerText);
        calculadora.updateDisplay();
        console.log('numberButton');
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.chooseOperation(button.innerText);
        calculadora.updateDisplay();
        console.log('operationButton');
    });
});

equalsButton.addEventListener('click', () => {
    calculadora.calculate();
    calculadora.updateDisplay();
    console.log('equalsButton');
});

deleteButton.addEventListener('click', () => {
    calculadora.delete();
    calculadora.updateDisplay();
    console.log('deleteButton');
});

clearAllButton.addEventListener('click', () => {
    calculadora.clear();
    calculadora.updateDisplay();
    console.log('clearAllButton');
});
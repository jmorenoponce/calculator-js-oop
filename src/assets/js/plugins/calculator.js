
"use strict";

class Calculator {

    // Take the Buttons selector bonding & reset
    constructor() {

        this.initialize();
        this.clearAll();
    }


    // Buttons selector bonding & Listeners
    initialize() {

        // Display selector bonding
        const previousOperandTextElement = document.querySelector('.ux-data-previous-operand');
        const currentOperandTextElement = document.querySelector('.ux-data-current-operand');

        // Display value elements
        this._previousOperandTextElement = previousOperandTextElement;
        this._currentOperandTextElement = currentOperandTextElement;

        // Buttons selector bonding
        const numberButtons = document.querySelectorAll('.ux-data-number');
        const operationButtons = document.querySelectorAll('.ux-data-operation');
        const equalsButton = document.querySelector('.ux-data-equals');
        const deleteButton = document.querySelector('.ux-data-delete');
        const clearAllButton = document.querySelector('.ux-data-clear-all');

        // Init the Listeners for buttons control (Memory Functions not implemented yet)
        numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.innerText);
                this.updateDisplay();
            });
        });

        operationButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.chooseOperation(button.innerText);
                this.updateDisplay();
            });
        });

        equalsButton.addEventListener('click', () => {
            this.calculate();
            this.updateDisplay();
        });

        deleteButton.addEventListener('click', () => {
            this.deleteNumber();
            this.updateDisplay();
        });

        clearAllButton.addEventListener('click', () => {
            this.clearAll();
            this.updateDisplay();
        });
    }


    // Clear All (CE Button = Operands & Operation)
    clearAll() {

        this._currentOperand = '';
        this._previousOperand = '';
        this._operation = null;
    }


    // Add new digit to current operand
    appendNumber(number) {

        if (number === '.' && this._currentOperand.toString().includes('.')) return;

        this._currentOperand = this._currentOperand.toString() + number.toString();
    }


    // Remove last digit from current operand (DEL Button)
    deleteNumber() {

        this._currentOperand = this._currentOperand.toString().slice(0, -1);
    }


    // Add selected operation. Calculate only if both operands are filled
    chooseOperation(operation) {

        if (this._currentOperand === '') return;

        if (this._previousOperand !== '') {
            this.calculate();
        }

        this._operation = operation;
        this._previousOperand = this._currentOperand;
        this._currentOperand = '';
    }


    // Float operations is under revision
    calculate() {

        const prev = parseFloat(this._previousOperand);
        const current = parseFloat(this._currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        let result;

        switch (this._operation) {
            case '+':
                result = prev + current;
                break;

            case '-':
                result = prev - current;
                break;

            case '*':
                result = prev * current;
                break;

            case '/':
                result = prev / current;
                break;

            default:
                return;
        }

        this._currentOperand = result;
        this._previousOperand = '';
        this._operation = null;
    }


    // Refresh the display
    updateDisplay() {

        this._currentOperandTextElement.innerText = this._currentOperand;

        if (this._operation != null) {
            this._previousOperandTextElement.innerText = `${this._getDisplayNumber(this._previousOperand)} ${this._operation}`;
        } else {
            this._previousOperandTextElement.innerText = '';
        }
    }


    // Take number from display and parse if contains decimal digits
    _getDisplayNumber(number) {

        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('es', {maximumFractionDigits: 0});
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

}

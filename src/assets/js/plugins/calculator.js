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
        const previousOperandTextElement = document.querySelector('.ux-calc-previous-operand');
        const currentOperandTextElement = document.querySelector('.ux-calc-current-operand');

        // Assign Display value elements
        this._previousOperandTextElement = previousOperandTextElement;
        this._currentOperandTextElement = currentOperandTextElement;

        //  General Buttons selector bonding
        const numberButtons = document.querySelectorAll('.ux-calc-number');
        const operationButtons = document.querySelectorAll('.ux-calc-operation');
        const memoryButtons = document.querySelectorAll('.ux-calc-memory');
        const equalsButton = document.querySelector('.ux-calc-equals');
        const deleteButton = document.querySelector('.ux-calc-delete');
        const clearOperandButton = document.querySelector('.ux-calc-clear-operand');
        const clearAllButton = document.querySelector('.ux-calc-clear-all');

        // Init the Listeners for buttons control
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

        memoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.memoryManager(button.innerText);
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

        clearOperandButton.addEventListener('click', () => {
            this.clearOperand();
            this.updateDisplay()
        })

        clearAllButton.addEventListener('click', () => {
            this.clearAll();
            this.updateDisplay();
        });

        clearAllButton.addEventListener('click', () => {
            this.clearAll();
            this.updateDisplay();
        });

    }


    // Manage for Memory Operations
    memoryManager(operation) {

        switch (operation) {
            case 'MC':
                this._memoryData = 0;
                break;

            case 'MR':
                this._currentOperand = this._memoryData.toString();
                break;

            case 'M+':
                this._memoryData += parseFloat(this._currentOperand);
                break;

            case 'M-':
                this._memoryData -= parseFloat(this._currentOperand);
                break;

            default:
                return;
        }
    }


    // Clear All (CE Button = Operands & Operation)
    clearAll() {

        this._memoryData = 0;
        this._currentOperand = '';
        this._previousOperand = '';
        this._operation = null;
    }


    // Clear current (C Button = Current Operand)
    clearOperand() {

        this._currentOperand = '';
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

            case '+/-':
                result = !(current);
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

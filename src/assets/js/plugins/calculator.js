"use strict";

class Calculator {

    _elements = {
        numberButtons: false,
        operationButtons: false,
        memoryButtons: false,
        equalsButton: false,
        deleteButton: false,
        clearOperandButton: false,
        clearAllButton: false,
        previousOperandDisplay: false,
        currentOperandDisplay: false
    }

    // Take the Buttons selector binding & reset
    constructor() {

        this._defineValues();

        this.initialize();

        this.clearAll();
        this._memoryManager(this.BUTTON_VALUES.MEM_CLEAR);
        this._updateDisplay();
    }


    // Buttons selector binding & Listeners
    initialize() {

        this._bindingElements()
        this._initButtonsEvents()
    }


    // Clear All (CE Button = Operands & Operation)
    clearAll() {

        this._currentOperand = '0';
        this._previousOperand = '0';
        this._operation = null;
    }


    // Clear Current (C Button = Current Operand)
    clearOperand() {

        this._currentOperand = '0';
    }


    // Remove Last digit from Current operand (DEL Button)
    deleteNumber() {

        this._currentOperand = this._currentOperand.toString().slice(0, -1);

        if (this._currentOperand === '')
            this._currentOperand = '0';
    }


    // Add new digit to Current operand
    appendNumber(number) {

        if (number === '.' && this._currentOperand.toString().includes('.'))
            return;

        if (number !== '.' && this._currentOperand === '0')
            this._currentOperand = '';

        this._currentOperand = this._currentOperand.toString() + number;
    }


    // Add selected operation. Calculate only if both operands are filled
    chooseOperation(operation) {

        if (this._previousOperand !== '0') {
            this.calculate();
        }

        this._previousOperand = this._currentOperand;
        this._currentOperand = '0';
        this._operation = operation;
    }


    // Float operations is under revision
    calculate() {

        const prev = parseFloat(this._previousOperand);
        const current = parseFloat(this._currentOperand);

        if (isNaN(prev) || isNaN(current))
            return;

        let result;

        switch (this._operation) {
            case this.BUTTON_VALUES.OPE_SUM:
                result = prev + current;
                break;

            case this.BUTTON_VALUES.OPE_SUB:
                result = prev - current;
                break;

            case this.BUTTON_VALUES.OPE_MUL:
                result = prev * current;
                break;

            case this.BUTTON_VALUES.OPE_DIV:
                result = prev / current;
                break;

            case this.BUTTON_VALUES.OPE_NEG:
                result = current * -1;
                break;

            default:
                return;
        }

        this._currentOperand = result.toString();
        this._previousOperand = '0';
        this._operation = null;
    }


    // Manager for Memory Operations
    _memoryManager(operation) {

        switch (operation) {
            case this.BUTTON_VALUES.MEM_CLEAR: // Clear
                this._memoryData = 0;
                break;

            case this.BUTTON_VALUES.MEM_READ: // Read
                this._currentOperand = this._memoryData.toString();
                break;

            case this.BUTTON_VALUES.MEM_STORE: // Store
                this._memoryData = parseFloat(this._currentOperand);
                break;

            case this.BUTTON_VALUES.MEM_SUM: // Add
                this._memoryData += parseFloat(this._currentOperand);
                break;

            case this.BUTTON_VALUES.MEM_SUB: // Subs
                this._memoryData -= parseFloat(this._currentOperand);
                break;

            default:
                return;
        }
    }


    // Refresh the Display elements
    _updateDisplay() {

        this._elements.currentOperandDisplay.innerText = this._currentOperand;

        if (this._operation != null) {
            this._elements.previousOperandDisplay.innerText = `${this._getDisplayNumber(this._previousOperand)} ${this._operation}`;
        } else {
            this._elements.previousOperandDisplay.innerText = '';
        }
    }



    // Take number from Display and parse the decimal digits
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


    _defineValues() {

        this.BUTTON_VALUES = {
            MEM_CLEAR: 'MC',
            MEM_READ: 'MR',
            MEM_STORE: 'MS',
            MEM_SUM: 'M+',
            MEM_SUB: 'M-',

            OPE_SUM: '+',
            OPE_SUB: '-',
            OPE_MUL: '*',
            OPE_DIV: '/',
            OPE_NEG: '+/-',

            DIGIT_0: '0',
            DIGIT_1: '1',
            DIGIT_2: '2',
            DIGIT_3: '3',
            DIGIT_4: '4',
            DIGIT_5: '5',
            DIGIT_6: '6',
            DIGIT_7: '7',
            DIGIT_8: '8',
            DIGIT_9: '9',
        }

        const KEY_CODES = {
            KEY_ENTER: 13,
            KEY_BACKSPACE: 8,
            KEY_SPACE: 32,
            KEY_UP: 38,
            KAY_DOWN: 40
        }
    }


    _bindingElements() {
        // Display selector binding
        this._elements.previousOperandDisplay = document.querySelector('.ux-calc-previous-operand');
        this._elements.currentOperandDisplay = document.querySelector('.ux-calc-current-operand');

        //  General Buttons selector binding
        this._elements.numberButtons = document.querySelectorAll('.ux-calc-number');
        this._elements.operationButtons = document.querySelectorAll('.ux-calc-operation');
        this._elements.memoryButtons = document.querySelectorAll('.ux-calc-memory');
        this._elements.equalsButton = document.querySelector('.ux-calc-equals');
        this._elements.deleteButton = document.querySelector('.ux-calc-delete');
        this._elements.clearOperandButton = document.querySelector('.ux-calc-clear-operand');
        this._elements.clearAllButton = document.querySelector('.ux-calc-clear-all');
    }


    _initButtonsEvents() {
        // Init the Listeners for buttons control
        this._elements.numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.innerText);
                this._updateDisplay();
            });
        });

        this._elements.operationButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.chooseOperation(button.innerText);
                this._updateDisplay();
            });
        });

        this._elements.memoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                this._memoryManager(button.innerText);
                this._updateDisplay();
            });
        });

        this._elements.equalsButton.addEventListener('click', () => {
            this.calculate();
            this._updateDisplay();
        });

        this._elements.deleteButton.addEventListener('click', () => {
            this.deleteNumber();
            this._updateDisplay();
        });

        this._elements.clearOperandButton.addEventListener('click', () => {
            this.clearOperand();
            this._updateDisplay()
        })

        this._elements.clearAllButton.addEventListener('click', () => {
            this.clearAll();
            this._updateDisplay();
        });
    }
}


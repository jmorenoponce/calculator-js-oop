"use strict";


class Calculator {


    // Take the Buttons selector binding & reset
    constructor() {

        this._viewElems = {
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

        this._currentOperand = '';
        this._previousOperand = '';
        this._operation = null;

<<<<<<< HEAD
        this.clearAll();
        this._memoryManager(this.BUTTON_VALUES.MEM_CLEAR);
        this._updateDisplay();
=======
        this._memoryData = 0;

        this._elemCodes = {};
        this._keyCodes = {};

        this.initialize();
>>>>>>> develop/jose
    }


    // Buttons selector binding & Listeners
    initialize() {


        this._declareKeyCodes();
        this._declareElemCodes();
        this._initViewElements();
        this._initViewEvents();
        this._initKeyEvents();
        this._memoryManager(this._elemCodes.MEM_CLEAR);

        this.clearAll();
        this._updateDisplay();
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
            case this._elemCodes.OPE_SUM:
                result = prev + current;
                break;

            case this._elemCodes.OPE_SUB:
                result = prev - current;
                break;

            case this._elemCodes.OPE_MUL:
                result = prev * current;
                break;

            case this._elemCodes.OPE_DIV:
                result = prev / current;
                break;

            case this._elemCodes.OPE_NEG:
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
            case this._elemCodes.MEM_CLEAR: // Clear
                this._memoryData = 0;
                break;

            case this._elemCodes.MEM_READ: // Read
                this._currentOperand = this._memoryData.toString();
                break;

            case this._elemCodes.MEM_STORE: // Store
                this._memoryData = parseFloat(this._currentOperand);
                break;

            case this._elemCodes.MEM_SUM: // Add
                this._memoryData += parseFloat(this._currentOperand);
                break;

            case this._elemCodes.MEM_SUB: // Subs
                this._memoryData -= parseFloat(this._currentOperand);
                break;

            default:
                return;
        }
    }


    // Refresh the Display elements
    _updateDisplay() {

        this._viewElems.currentOperandDisplay.innerText = this._currentOperand;

        if (this._operation != null) {
            this._viewElems.previousOperandDisplay.innerText = `${this._getDisplayNumber(this._previousOperand)} ${this._operation}`;
        } else {
            this._viewElems.previousOperandDisplay.innerText = '';
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


    _initViewElements() {

        // Display selector binding
        this._viewElems.previousOperandDisplay = document.querySelector('.ux-calc-previous-operand');
        this._viewElems.currentOperandDisplay = document.querySelector('.ux-calc-current-operand');

        //  Buttons selector binding
        this._viewElems.numberButtons = document.querySelectorAll('.ux-calc-number');
        this._viewElems.operationButtons = document.querySelectorAll('.ux-calc-operation');
        this._viewElems.memoryButtons = document.querySelectorAll('.ux-calc-memory');
        this._viewElems.equalsButton = document.querySelector('.ux-calc-equals');
        this._viewElems.deleteButton = document.querySelector('.ux-calc-delete');
        this._viewElems.clearOperandButton = document.querySelector('.ux-calc-clear-operand');
        this._viewElems.clearAllButton = document.querySelector('.ux-calc-clear-all');
    }


    _initViewEvents() {
        // Init the Listeners for buttons control
        this._viewElems.numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.innerText);
                this._updateDisplay();
            });
        });

        this._viewElems.operationButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.chooseOperation(button.innerText);
                this._updateDisplay();
            });
        });

        this._viewElems.memoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                this._memoryManager(button.innerText);
                this._updateDisplay();
            });
        });

        this._viewElems.equalsButton.addEventListener('click', () => {
            this.calculate();
            this._updateDisplay();
        });

        this._viewElems.deleteButton.addEventListener('click', () => {
            this.deleteNumber();
            this._updateDisplay();
        });

        this._viewElems.clearOperandButton.addEventListener('click', () => {
            this.clearOperand();
            this._updateDisplay()
        })

        this._viewElems.clearAllButton.addEventListener('click', () => {
            this.clearAll();
            this._updateDisplay();
        });
    }


    _initKeyEvents() {

        console.log(this._keyCodes);
    }


    _declareKeyCodes() {

        this._keyCodes = {
            KEY_ENTER: 13,
            KEY_BACKSPACE: 8,
            KEY_SPACE: 32,
            KEY_UP: 38,
            KAY_DOWN: 40
        }
    }

    _declareElemCodes () {

        this._elemCodes = {
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
    }

}


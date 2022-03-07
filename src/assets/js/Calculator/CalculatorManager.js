"use strict";


class CalculatorManager {


    // Take the Buttons selector binding & reset
    constructor() {

        this._currentOperand = '';
        this._previousOperand = '';
        this._operation = null;

        this._memoryData = 0;

        this.initialize();
    }


    // Buttons selector binding & Listeners
    initialize() {

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
            case this._elementCodes.OPR_SUM:
                result = prev + current;
                break;

            case this._elementCodes.OPR_SUB:
                result = prev - current;
                break;

            case this._elementCodes.OPR_MUL:
                result = prev * current;
                break;

            case this._elementCodes.OPR_DIV:
                result = prev / current;
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
            case this._elementCodes.MEM_CLEAR: // Clear
                this._memoryData = 0;
                break;

            case this._elementCodes.MEM_READ: // Read
                this._currentOperand = this._memoryData.toString();
                break;

            case this._elementCodes.MEM_STORE: // Store
                this._memoryData = parseFloat(this._currentOperand);
                break;

            case this._elementCodes.MEM_SUM: // Add
                this._memoryData += parseFloat(this._currentOperand);
                break;

            case this._elementCodes.MEM_SUB: // Subs
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
}

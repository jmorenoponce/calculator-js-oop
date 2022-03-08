"use strict";


class CalculatorCore {


    constructor(userInterface) {

        this._userInterface = userInterface;

        this._currentOperand = null;
        this._previousOperand = null;
        this._operation = null;

        this._memoryData = 0;

        this._initialize();
    }


    _initialize() {

        this._clearAll();
        this._updateDisplay();
    }


    _clearAll() {

        this._currentOperand = '0';
        this._previousOperand = '0';
        this._operation = null;
    }


    _clearOperand() {

        this._currentOperand = '0';
    }


    _deleteNumber() {

        this._currentOperand = this._currentOperand.toString().slice(0, -1);

        if (this._currentOperand === '')
            this._currentOperand = '0';
    }


    _appendNumber(number) {

        if (number === '.' && this._currentOperand.toString().includes('.'))
            return;

        if (number !== '.' && this._currentOperand === '0')
            this._currentOperand = '';

        this._currentOperand = this._currentOperand.toString() + number;
    }


    _chooseOperation(operation) {

        if (this._previousOperand !== '0') {
            this._calculate();
        }

        this._previousOperand = this._currentOperand;
        this._currentOperand = '0';
        this._operation = operation;
    }


    _calculate() {

        const prev = parseFloat(this._previousOperand);
        const current = parseFloat(this._currentOperand);

        if (isNaN(prev) || isNaN(current))
            return;

        let result;

        switch (this._operation) {
            case this._userInterface._elementCodes.OPR_SUM:
                result = prev + current;
                break;

            case this._userInterface._elementCodes.OPR_SUB:
                result = prev - current;
                break;

            case this._userInterface._elementCodes.OPR_MUL:
                result = prev * current;
                break;

            case this._userInterface._elementCodes.OPR_DIV:
                result = prev / current;
                break;

            default:
                return;
        }

        this._currentOperand = result.toString();
        this._previousOperand = '0';
        this._operation = null;
    }


    _memoryManager(operation) {

        switch (operation) {
            case this._userInterface._elementCodes.MEM_CLEAR: // Clear
                this._memoryData = 0;
                break;

            case this._userInterface._elementCodes.MEM_READ: // Read
                this._currentOperand = this._memoryData.toString();
                break;

            case this._userInterface._elementCodes.MEM_STORE: // Store
                this._memoryData = parseFloat(this._currentOperand);
                break;

            case this._userInterface._elementCodes.MEM_SUM: // Add
                this._memoryData += parseFloat(this._currentOperand);
                break;

            case this._userInterface._elementCodes.MEM_SUB: // Subs
                this._memoryData -= parseFloat(this._currentOperand);
                break;

            default:
                return;
        }
    }


    _updateDisplay() {

        this._userInterface._viewElements.currentOperandDisplay.innerText = this._currentOperand;

        if (this._operation != null) {
            this._userInterface._viewElements.previousOperandDisplay.innerText = `${this._getDisplayNumber(this._previousOperand)} ${this._operation}`;
        } else {
            this._userInterface._viewElements.previousOperandDisplay.innerText = '';
        }
    }


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

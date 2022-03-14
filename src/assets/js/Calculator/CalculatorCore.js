"use strict";


class CalculatorCore {


    constructor() {

        this._interfaceCodes = {};

        this._currentOperand = null;
        this._previousOperand = null;
        this._operation = null;

        this._memoryData = 0;
    }


    init(interfaceCodes) {

        this._interfaceCodes = interfaceCodes;
        this._initialize();
    }


    _initialize() {

        this.clearAll();
    }


    clearAll() {

        this._currentOperand = '0';
        this._previousOperand = '0';
        this._operation = null;
    }


    clearOperand() {

        this._currentOperand = '0';
    }


    deleteNumber() {

        this._currentOperand = this._currentOperand.toString().slice(0, -1);

        if (this._currentOperand === '')
            this._currentOperand = '0';
    }


    appendNumber(number) {

        if (number === '.' && this._currentOperand.toString().includes('.'))
            return;

        if (number !== '.' && this._currentOperand === '0')
            this._currentOperand = '';

        this._currentOperand = this._currentOperand.toString() + number;
    }


    chooseOperation(operation) {

        if (this._previousOperand !== '0') {
            this.calculate();
        }

        this._previousOperand = this._currentOperand;
        this._currentOperand = '0';
        this._operation = operation;
    }


    calculate() {

        const prev = parseFloat(this._previousOperand);
        const current = parseFloat(this._currentOperand);

        if (isNaN(prev) || isNaN(current))
            return;

        let result;

        switch (this._operation) {
            case this._interfaceCodes.OPR_SUM:
                result = prev + current;
                break;

            case this._interfaceCodes.OPR_SUB:
                result = prev - current;
                break;

            case this._interfaceCodes.OPR_MUL:
                result = prev * current;
                break;

            case this._interfaceCodes.OPR_DIV:
                result = prev / current;
                break;

            default:
                return;
        }

        this._currentOperand = result.toString();
        this._previousOperand = '0';
        this._operation = null;
    }


    memoryManager(operation) {

        switch (operation) {
            case this._interfaceCodes.MEM_CLEAR: // Clear
                this._memoryData = 0;
                break;

            case this._interfaceCodes.MEM_READ: // Read
                this._currentOperand = this._memoryData.toString();
                break;

            case this._interfaceCodes.MEM_STORE: // Store
                this._memoryData = parseFloat(this._currentOperand);
                break;

            case this._interfaceCodes.MEM_SUM: // Add
                this._memoryData += parseFloat(this._currentOperand);
                break;

            case this._interfaceCodes.MEM_SUB: // Subs
                this._memoryData -= parseFloat(this._currentOperand);
                break;

            default:
                return;
        }
    }
}

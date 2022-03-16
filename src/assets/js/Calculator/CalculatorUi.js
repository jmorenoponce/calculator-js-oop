"use strict";


class CalculatorUi {


    constructor() {

        this._environment = null;

        this._viewElements = {
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

        this._loadEnvironment();
        this._initialize();
    }


    _loadEnvironment() {

        this._environment = new CalculatorUiEnvironment();
    }


    _initialize() {

        this._initConfig();
        this._initViewElements();
    }


    _initConfig() {

        console.log(this._environment._config);
    }


    _initViewElements() {

        let _prueba = document.querySelectorAll('#ux-calc-display [class^="ux-calc-"]');

        console.log(_prueba);

        _prueba.each(function () {

            let target = this;
            let target_id = target.getAttribute('data-calc-key');

            console.log(target_id);
        });

        // this._viewElements.previousOperandDisplay = document.querySelector('.ux-calc-previous-operand');
        // this._viewElements.currentOperandDisplay = document.querySelector('.ux-calc-current-operand');
        //
        // this._viewElements.numberButtons = document.querySelectorAll('.ux-calc-number');
        // this._viewElements.operationButtons = document.querySelectorAll('.ux-calc-operation');
        // this._viewElements.memoryButtons = document.querySelectorAll('.ux-calc-memory');
        // this._viewElements.equalsButton = document.querySelector('.ux-calc-equals');
        // this._viewElements.deleteButton = document.querySelector('.ux-calc-delete');
        // this._viewElements.clearOperandButton = document.querySelector('.ux-calc-clear-operand');
        // this._viewElements.clearAllButton = document.querySelector('.ux-calc-clear-all');
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

    updateDisplay(currentOperand, previousOperand, operation) {

        this._currentOperand = currentOperand;
        this._previousOperand = previousOperand;
        this._operation = operation

        this._viewElements.currentOperandDisplay.innerText = this._currentOperand;
        this._viewElements.previousOperandDisplay.innerText = '';

        if (this._operation != null)
            this._viewElements.previousOperandDisplay.innerText = `${this._getDisplayNumber(this._previousOperand)} ${this._operation}`;
    }
}
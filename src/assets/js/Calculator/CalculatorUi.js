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

        this._createEnvironment();

        this._initialize();
    }


    _createEnvironment() {

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

        this._viewElements.previousOperandDisplay = document.querySelector('.ux-calc-previous-operand');
        this._viewElements.currentOperandDisplay = document.querySelector('.ux-calc-current-operand');

        this._viewElements.numberButtons = document.querySelectorAll('.ux-calc-number');
        this._viewElements.operationButtons = document.querySelectorAll('.ux-calc-operation');
        this._viewElements.memoryButtons = document.querySelectorAll('.ux-calc-memory');
        this._viewElements.equalsButton = document.querySelector('.ux-calc-equals');
        this._viewElements.deleteButton = document.querySelector('.ux-calc-delete');
        this._viewElements.clearOperandButton = document.querySelector('.ux-calc-clear-operand');
        this._viewElements.clearAllButton = document.querySelector('.ux-calc-clear-all');
    }
}
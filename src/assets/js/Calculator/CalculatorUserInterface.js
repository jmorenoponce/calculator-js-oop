"use strict";


class CalculatorUserInterface {


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

        this._environment = new CalculatorEnvironment();
    }


    _initialize() {

        this._initConfig();

        this._initViewElements();
        this._initViewEvents();

        this._initKeyboardEvents();
    }


    _initConfig() {

        console.log(this._environment._config);
    }


    _initViewElements() {

        // Display selector binding
        this._viewElements.previousOperandDisplay = document.querySelector('.ux-calc-previous-operand');
        this._viewElements.currentOperandDisplay = document.querySelector('.ux-calc-current-operand');

        //  Buttons selector binding
        this._viewElements.numberButtons = document.querySelectorAll('.ux-calc-number');
        this._viewElements.operationButtons = document.querySelectorAll('.ux-calc-operation');
        this._viewElements.memoryButtons = document.querySelectorAll('.ux-calc-memory');
        this._viewElements.equalsButton = document.querySelector('.ux-calc-equals');
        this._viewElements.deleteButton = document.querySelector('.ux-calc-delete');
        this._viewElements.clearOperandButton = document.querySelector('.ux-calc-clear-operand');
        this._viewElements.clearAllButton = document.querySelector('.ux-calc-clear-all');
    }


    _initViewEvents() {

        // Init the Listeners for buttons control
        this._viewElements.numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.innerText);
                this._updateDisplay();
            });
        });

        this._viewElements.operationButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.chooseOperation(button.innerText);
                this._updateDisplay();
            });
        });

        this._viewElements.memoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                this._memoryManager(button.innerText);
                this._updateDisplay();
            });
        });

        this._viewElements.equalsButton.addEventListener('click', () => {
            this.calculate();
            this._updateDisplay();
        });

        this._viewElements.deleteButton.addEventListener('click', () => {
            this.deleteNumber();
            this._updateDisplay();
        });

        this._viewElements.clearOperandButton.addEventListener('click', () => {
            this.clearOperand();
            this._updateDisplay()
        })

        this._viewElements.clearAllButton.addEventListener('click', () => {
            this.clearAll();
            this._updateDisplay();
        });
    }


    _initKeyboardEvents() {

        console.log(this._environment._keyboardCodes);
    }
}
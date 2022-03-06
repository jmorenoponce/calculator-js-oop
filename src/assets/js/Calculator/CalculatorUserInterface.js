"use strict";


class CalculatorUserInterface {


    constructor() {

        this._env = null;

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

        return this._initialize();
    }


    _initialize() {

        this._env = new CalculatorEnvironment();

        this._initViewElements();
        this._initViewEvents();
        this._initKeyboardEvents();
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


    _initKeyboardEvents() {

        console.log(this._keyboardCodes);
    }
}
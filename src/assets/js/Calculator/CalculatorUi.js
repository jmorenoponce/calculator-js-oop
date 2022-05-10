"use strict";


class CalculatorUi {


    constructor(calculatorCore) {

        this._core = calculatorCore;

        this._environment = null;

        this._viewElements = {
            previousOperandDisplay: null,
            currentOperandDisplay: null,
            buttonsPanel: null,
        }

        this._loadEnvironment();
        this._initialize();
    }


    _loadEnvironment() {

        this._environment = new CalculatorUiEnvironment();
    }


    _initialize() {

        this._initConfig();
        this._initElements();
        this._initEvents();

        this._core.init(this._environment._buttonsCodes);
    }


    _initConfig() {

        console.log(this._environment._config);
    }


    _initElements() {

        this._viewElements.previousOperandDisplay = document.querySelector('.ux-calc-previous-operand');
        this._viewElements.currentOperandDisplay = document.querySelector('.ux-calc-current-operand');
        this._viewElements.buttonsPanel = document.getElementById('ux-calc-panel');
    }


    _initEvents() {

        this._viewElements.buttonsPanel.addEventListener('click', (element) => {

            this._catchViewEvent(element.target);
        });
    }


    _catchViewEvent(element) {

        const _action = element.getAttribute('data-calc-key');

        if (element.classList.contains('ux-calc-memory')) {
            this._memoryManager(_action);
            return;
        }

        if (element.classList.contains('ux-calc-number')) {
            this._numberManager(_action);
            return;
        }

        if (element.classList.contains('ux-calc-operation')) {
            this._operationManager(_action);
            return;
        }

        if (element.classList.contains('ux-calc-status')) {
            this._functionManager(_action);
            return;
        }

        return false;
    }


    _memoryManager(action) {

        console.log(action);
    }


    _numberManager(action) {

        this._core.appendNumber(action);
    }


    _operationManager(action) {

        console.log(action);
    }


    _functionManager(action) {

        console.log(action);
    }


    // switch (e.key) {
    //
    //     case _elementCodes.FNC_CE:
    //     case _keyboardCodes.KEY_ESCAPE:
    //         this.clearAll();
    //         this._updateDisplay();
    //         break;
    //
    //     case 'Backspace':
    //         this.clearEntry();
    //         break;
    //
    //     case '+':
    //     case '-':
    //     case '*':
    //     case '/':
    //     case '%':
    //         this.addOperation(e.key);
    //         break;
    //
    //     case 'Enter':
    //     case '=':
    //         this.calc();
    //         break;
    //
    //     case '.':
    //     case ',':
    //         this.addDot();
    //         break;
    //
    //
    //     case 'c':
    //         if (e.ctrlKey) this.copyToClipboard();
    //         break;
    // }

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


    _updateDisplay(currentOperand, previousOperand, operation) {

        this._currentOperand = currentOperand;
        this._previousOperand = previousOperand;
        this._operation = operation

        this._viewElements.currentOperandDisplay.innerText = this._currentOperand;
        this._viewElements.previousOperandDisplay.innerText = '';

        if (this._operation != null)
            this._viewElements.previousOperandDisplay.innerText = `${this._getDisplayNumber(this._previousOperand)} ${this._operation}`;
    }
}
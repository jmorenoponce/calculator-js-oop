"use strict";


class CalculatorUiManager {


    constructor(userInterface, calculatorCore) {

        this._interface = userInterface;
        this._core = calculatorCore;
    }


    init() {

        this._initViewEvents();
        this._initKeyboardEvents();
        
        this._core.init(this._interface._elementCodes);
    }


    _initViewEvents() {


        this._interface._viewElements.numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                this._core.appendNumber(button.innerText);
                this._interface.updateDisplay();
            });
        });

        this._interface._viewElements.operationButtons.forEach(button => {
            button.addEventListener('click', () => {
                this._core.chooseOperation(button.innerText);
                this._interface.updateDisplay();
            });
        });

        this._interface._viewElements.memoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                this._core.memoryManager(button.innerText);
                this._interface.updateDisplay();
            });
        });

        this._interface._viewElements.equalsButton.addEventListener('click', () => {
            this._core.calculate();
            this._interface.updateDisplay();
        });

        this._interface._viewElements.deleteButton.addEventListener('click', () => {
            this._core.deleteNumber();
            this._interface.updateDisplay();
        });

        this._interface._viewElements.clearOperandButton.addEventListener('click', () => {
            this._core.clearOperand();
            this._interface.updateDisplay()
        })

        this._interface._viewElements.clearAllButton.addEventListener('click', () => {
            this._core.clearAll();
            this._interface.updateDisplay();
        });

    }


    _initKeyboardEvents() {

        // console.log(this._environment._keyboardCodes);
    }


    _catchViewEvent() {

        // let _elementCodes = this._environment._elementCodes;
        // let _keyboardCodes = this._environment._keyboardCodes;

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
        //     case '0':
        //     case '1':
        //     case '2':
        //     case '3':
        //     case '4':
        //     case '5':
        //     case '6':
        //     case '7':
        //     case '8':
        //     case '9':
        //
        //         this.addOperation(parseInt(e.key));
        //         break;
        //
        //     case 'c':
        //         if (e.ctrlKey) this.copyToClipboard();
        //         break;
        // }
    }
}

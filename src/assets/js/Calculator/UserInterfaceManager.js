"use strict";


class UserInterfaceManager {


    constructor(userInterface, core) {

        this._userInterface = userInterface;
        this._core = core;

        this._initCore();
        this._initInterface();
    }


    _initCore() {

        this._core.create(this._userInterface);
    }


    _initInterface() {

        this._initViewEvents();

        this._initKeyboardEvents();
    }


    // Aquí es donde van los métodos que escuchan
    _initViewEvents() {


        // this._viewElements.addEventListener('click', () => {
        //
        //     this._catchViewEvent();
        // })


        //     // Init the Listeners for buttons control
        //     this._viewElements.numberButtons.forEach(button => {
        //         button.addEventListener('click', () => {
        //             this.appendNumber(button.innerText);
        //             this._updateDisplay();
        //         });
        //     });
        //
        //     this._viewElements.operationButtons.forEach(button => {
        //         button.addEventListener('click', () => {
        //             this.chooseOperation(button.innerText);
        //             this._updateDisplay();
        //         });
        //     });
        //
        //     this._viewElements.memoryButtons.forEach(button => {
        //         button.addEventListener('click', () => {
        //             this._memoryManager(button.innerText);
        //             this._updateDisplay();
        //         });
        //     });
        //
        //     this._viewElements.equalsButton.addEventListener('click', () => {
        //         this.calculate();
        //         this._updateDisplay();
        //     });
        //
        //     this._viewElements.deleteButton.addEventListener('click', () => {
        //         this.deleteNumber();
        //         this._updateDisplay();
        //     });
        //
        //     this._viewElements.clearOperandButton.addEventListener('click', () => {
        //         this.clearOperand();
        //         this._updateDisplay()
        //     })
        //
        //     this._viewElements.clearAllButton.addEventListener('click', () => {
        //         this.clearAll();
        //         this._updateDisplay();
        //     });
    }


    _initKeyboardEvents() {

        console.log(this._environment._keyboardCodes);
    }


    _catchViewEvent() {

        let _elementCodes = this._environment._elementCodes;
        let _keyboardCodes = this._environment._keyboardCodes;

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

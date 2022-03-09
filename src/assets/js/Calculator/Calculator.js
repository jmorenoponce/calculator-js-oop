"use strict";


class Calculator {


    constructor() {

        this._manager = null;
        this._userInterface = null;
        this._calculatorCore = null;
    }


    init() {

        this._calculatorCore = new CalculatorCore();
        this._userInterface = new CalculatorUi();
        this._manager = new CalculatorManager(this._calculatorCore, this._userInterface);

        this._manager.init();
    }
}
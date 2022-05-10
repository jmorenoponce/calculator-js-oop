"use strict";

class Calculator {

    constructor() {

        this._userInterface = null;
        this._calculatorCore = null;
    }

    init() {

        this._calculatorCore = new CalculatorCore();
        this._userInterface = new CalculatorUi(this._calculatorCore);
    }
}
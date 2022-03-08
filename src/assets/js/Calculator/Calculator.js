"use strict";


class Calculator {


    constructor() {

        this._calculatorCore = null;
        this._userInterface = null;
        this._interfaceManager = null;
    }


    init() {

        this._calculatorCore = new CalculatorCore();
        this._userInterface = new CalculatorUi();
        this._interfaceManager = new CalculatorManager(this._userInterface, this._calculatorCore);

        this._interfaceManager.init();
    }
}
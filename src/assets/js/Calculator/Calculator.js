"use strict";


class Calculator {


    constructor() {

        this._userInterface = null;
        this._calculatorCore = null;

        this._interfaceManager = null;
    }


    init() {

        this._userInterface = new CalculatorUi();
        this._calculatorCore = new CalculatorCore();

        this._interfaceManager = new CalculatorUiManager(this._userInterface, this._calculatorCore);
        this._interfaceManager.init();
    }
}
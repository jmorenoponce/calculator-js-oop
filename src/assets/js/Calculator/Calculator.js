"use strict";


class Calculator {


    constructor() {

        this._userInterface = null;
        this._manager = null;

        this._initialize();
    }


    _initialize() {

        this._userInterface = new CalculatorUserInterface();
        this._manager = new CalculatorManager(this._userInterface);
    }
}
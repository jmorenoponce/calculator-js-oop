"use strict";


class Calculator {


    constructor() {

        this._userInterface = null;
        this._coreManager = null;
    }


    init() {

        this._userInterface = new CalculatorUserInterface();
        this._coreManager = new CalculatorManager(this._userInterface);

        console.log(this._coreManager);
    }
}
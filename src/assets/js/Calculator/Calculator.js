"use strict";


class Calculator {


    constructor() {

        this._core = null;
        this._userInterface = null;
        this._interfaceManager = null;
    }


    init() {

        this._userInterface = new UserInterface();
        this._core = new CalculatorCore();

        this._interfaceManager = new UserInterfaceManager(this._userInterface, this._core)

        console.log(this._interfaceManager);
    }
}
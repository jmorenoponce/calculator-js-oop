"use strict";


class CalculatorManager {


    constructor(userInterface) {

        this._userInterface = userInterface;
        this._core = null;

        this._initCore();
    }


    _initCore() {

        this._core = new CalculatorCore(this._userInterface);
    }
}

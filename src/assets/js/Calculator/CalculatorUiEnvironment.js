"use strict";


class CalculatorUiEnvironment {


    constructor() {

        this._config = {}
        this._buttonsCodes = {};
        this._keyboardCodes = {};

        this._initialize();
    }


    _initialize() {

        this._config = this._defaultConfig();
        this._buttonsCodes = this._defaultButtonsCodes();
        this._keyboardCodes = this._defaultKeyboardCodes();
    }


    _defaultConfig() {

        return {
            THEME: 'Dark',
            LOCALE: 'es',
            SCIENTIFIC: false,
            DECIMALS_DIGIT: 2
            // ...
        }
    }


    _defaultButtonsCodes() {

        return {
            FNC_C: 'C',
            FNC_CE: 'CE',
            FNC_DEL: 'DEL',
            FNC_NEG: '+/-',

            MEM_CLEAR: 'MC',
            MEM_READ: 'MR',
            MEM_STORE: 'MS',
            MEM_SUM: 'M+',
            MEM_SUB: 'M-',

            OPR_SUM: '+',
            OPR_SUB: '-',
            OPR_MUL: '*',
            OPR_DIV: '/',
            OPR_EQU: '=',

            DGT_0: '0',
            DGT_1: '1',
            DGT_2: '2',
            DGT_3: '3',
            DGT_4: '4',
            DGT_5: '5',
            DGT_6: '6',
            DGT_7: '7',
            DGT_8: '8',
            DGT_9: '9',
        }
    }


    _defaultKeyboardCodes() {

        return {
            KEY_ENTER: 13,
            KEY_BACKSPACE: 8,
            KEY_SPACE: 32,
            KEY_UP: 38,
            KEY_DOWN: 40
            // ...
        };
    }
}

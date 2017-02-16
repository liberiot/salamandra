"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    developer: "panStamp",
    product: "Single-input binary sensor",
    pwrdownmode: "true",
    registers: [{
        id: 7,
        endpoints: [{
            name: "Voltage",
            type: "float",
            dir: "input",
            size: 2,
            pos: 0,
            units: [{
                name: "V",
                factor: 0.001,
                offset: 0
            }]
        }, {
            name: "binary input",
            type: "bool",
            dir: "input",
            size: 1,
            pos: 2,
            units: []
        }]
    }]
};
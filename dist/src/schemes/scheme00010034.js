"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    developer: "panStamp",
    product: "8-input binary sensor",
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
            name: "binary input 0",
            type: "bool",
            dir: "input",
            size: 0.1,
            pos: 2.7,
            units: []
        }, {
            name: "binary input 1",
            type: "bool",
            dir: "input",
            size: 0.1,
            pos: 2.6,
            units: []
        }, {
            name: "binary input 2",
            type: "bool",
            dir: "input",
            size: 0.1,
            pos: 2.5,
            units: []
        }, {
            name: "binary input 3",
            type: "bool",
            dir: "input",
            size: 0.1,
            pos: 2.4,
            units: []
        }, {
            name: "binary input 4",
            type: "bool",
            dir: "input",
            size: 0.1,
            pos: 2.3,
            units: []
        }, {
            name: "binary input 5",
            type: "bool",
            dir: "input",
            size: 0.1,
            pos: 2.2,
            units: []
        }, {
            name: "binary input 6",
            type: "bool",
            dir: "input",
            size: 0.1,
            pos: 2.1,
            units: []
        }, {
            name: "binary input 7",
            type: "bool",
            dir: "input",
            size: 0.1,
            pos: 2.0,
            units: []
        }]
    }]
};
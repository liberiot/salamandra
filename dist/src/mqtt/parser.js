'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = parse;
exports.getCrc = getCrc;
exports.checkCrc = checkCrc;

var _schemes = require('../schemes');

var _schemes2 = _interopRequireDefault(_schemes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lodash = require('lodash');

var cnSensorTransmissions = {};
var DECIMALS = 2;

function parse(payload) {
    var rawData = payload.toString();
    var data = getData(rawData);
    var crc = getCrc(rawData);

    if (checkCrc(data, crc)) {
        return parseContents(payload);
    } else {
        console.log('An error was found in the package: ' + rawData + '. CRC: ' + crc);
        return null;
    }
}

function getData(payload) {
    var data = payload.slice(6, payload.length - 2);
    return data;
}

function getCrc(payload) {
    var crc = payload.slice(payload.length - 2, payload.length);
    return crc;
}

function checkCrc(packet, crc) {

    var tmpCrc = 0;
    for (var i = 0; i < packet.length; i += 2) {
        var hexa = packet[i] + packet[i + 1];
        tmpCrc += parseInt(hexa, 16);
    }

    return tmpCrc.toString(16).toUpperCase().slice(1, 3) === crc;
}

function parseContents(payload) {
    var data = getData(payload);
    var contents = getContents(data);
    var transmission = parseTransmission(payload);
    if (checkNonce(transmission.uid.full, transmission.cn)) {
        return emitTransmission(transmission, contents);
    } else {
        console.log('Nonce error');
        return null;
    }
}

function getContents(data) {
    var contents = data.slice(30, data.length);
    return contents;
}

function parseTransmission(data) {
    var transmission = {
        uid: {}
    };
    transmission.rr = parseInt(data.slice(1, 3), 16);
    transmission.ll = parseInt(data.slice(3, 5), 16);
    transmission.uid.full = data.slice(6, 30);
    transmission.uid.id = data.slice(6, 22);
    transmission.uid.code = data.slice(22, 30);
    transmission.cn = parseInt(data.slice(30, 32), 16);
    transmission.fnc = parseInt(data.slice(32, 34), 16);
    transmission.reg = parseInt(data.slice(34, 36), 16);
    transmission.measures = [];

    return transmission;
}

function checkNonce(uid, cn) {

    var checked = false;

    if (cnSensorTransmissions[uid]) {
        if (cnSensorTransmissions[uid] !== cn) {
            cnSensorTransmissions[uid] = cn;
            checked = true;
        }
    } else {
        cnSensorTransmissions[uid] = cn;
        checked = true;
    }
    return checked;
}

function emitTransmission(transmission, contents) {
    var scheme = _schemes2.default['scheme' + transmission.uid.code];
    if (!scheme) {
        console.log('No scheme found for ' + transmission.uid.full);
        return null;
    }

    var register = findRegister(scheme, transmission.reg);
    if (register) {
        register.endpoints.forEach(function (endpoint) {
            var params = {
                contents: contents,
                endpoint: endpoint,
                register: register,
                transmission: transmission
            };

            if (endpoint.type === 'bool') {
                // is boolean
                var value = parseBooleanMeasure(params);

                var measureParams = {
                    register: params.register,
                    endpoint: params.endpoint,
                    unit: null,
                    value: value
                };
                var measure = parseBoolean(transmission, measureParams);

                if (!measure.error) {
                    measure.type = 'bool';
                }
            } else {
                // not boolean
                parseMeasureUnits(params);
            }
        });
    }

    return transmission;
}

function findRegister(scheme, reg) {
    return scheme.registers.filter(function (register) {
        return register.id == reg;
    })[0];
}

function parseBooleanMeasure(params) {

    var value;

    if (params.endpoint.size % 1 != 0) {
        // 8 booleans in 1 byte
        var positions = params.endpoint.pos.toString().split('.');
        var hexaBinary = params.contents.slice(positions[0] * 2, positions[0] * 2 + 2);
        var binaryValue = fillWithZeros(parseInt(hexaBinary, 16).toString(2));
        value = binaryValue.slice(parseInt(positions[1]), parseInt(positions[1]) + 1);
    } else {
        // 1 boolean in 1 byte
        value = params.contents.slice(params.endpoint.pos * 2, params.endpoint.pos * 2 + params.endpoint.size * 2);
        value === '01' ? value = 1 : value = 0;
    }

    return value;
}

function parseBoolean(transmission, params) {

    var measure = {};
    measure.value = Number(params.value);
    measure.endpoint = params.endpoint.name;
    measure.type = 'bool';

    if (!isNaN(measure.value)) {
        measure.error = false;
        transmission.measures.push(measure);
    } else {
        measure = { error: true };
        console.log('NaN value encountered in transmission ' + transmission._id);
    }

    return measure;
}

function parseMeasureUnits(params) {

    var value = getFloatValue(params.contents, params.endpoint).toFixed(DECIMALS);
    var unitParams = {
        endpoint: params.endpoint,
        register: params.register,
        value: value
    };
    parseUnits(params.transmission, unitParams);
}

function getFloatValue(contents, endpoint) {
    return parseInt(contents.slice(endpoint.pos * 2, endpoint.pos * 2 + endpoint.size * 2), 16);
}

function parseUnits(transmission, params) {

    var measureParams = {
        register: params.register,
        endpoint: params.endpoint,
        value: params.value
    };
    if (params.endpoint.units.length > 0) {

        params.endpoint.units.forEach(function (unit) {
            measureParams.unit = unit;
            parseMeasure(transmission, measureParams);
        });
    } else {
        measureParams.unit = {
            name: "non-measurable",
            factor: 1,
            offset: 0
        };
        parseMeasure(transmission, measureParams);
    }
}

function parseMeasure(transmission, params) {

    var measure = {};

    measure.value = Number((params.value * params.unit.factor + params.unit.offset).toFixed(DECIMALS));
    measure.endpoint = params.endpoint.name;
    measure.type = params.unit.name;
    if (!isNaN(measure.value)) {
        transmission.measures.push(measure);
        measure.error = false;
    } else {
        measure = { error: true };
        console.log('NaN value encountered in transmission ' + transmission._id);
    }
    return measure;
}
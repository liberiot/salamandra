'use strict';
// sudo chmod 666 /dev/ttyUSB0

var _parser = require('./mqtt/parser');

var _parser2 = _interopRequireDefault(_parser);

var _liberiot = require('./liberiot');

var _liberiot2 = _interopRequireDefault(_liberiot);

var _mqttClient = require('./mqtt/mqttClient');

var _mqttClient2 = _interopRequireDefault(_mqttClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../config');
var SerialPort = require('serialport');

var CONTROL = 'control';
var ACTION_TOPIC = 1;

var port = new SerialPort(config.serial.port, {
    baudRate: config.serial.speed,
    parser: SerialPort.parsers.readline('\n')
});

_mqttClient2.default.on('connect', function () {
    return _mqttClient2.default.subscribe('#');
});

var liberiot = new _liberiot2.default();

var onData = function onData(msg) {
    if (msg[0] === '(' & msg[5] === ')') {
        var rawData = msg.toString().slice(0, msg.length - 1);
        publishLocal(rawData);
        liberiot.publish(rawData);
    }
};

function publishLocal(msg) {
    var transmission = (0, _parser2.default)(msg);
    if (transmission) {
        _mqttClient2.default.publish('local/data/' + transmission.uid.full + '/' + transmission.reg, JSON.stringify(transmission));
        console.log('Transmission published at local/' + transmission.uid.full + '/' + transmission.reg);
    }
}

var onError = function onError(err) {

    if (err.toString() === "Error: Error: Permission denied, cannot open /dev/ttyUSB0") {
        var error = err.toString();
        var errorSplitted = error.split(" ");
        var tty = errorSplitted[errorSplitted.length - 1];
        console.log("Permission denied, please try 'chmod 666 " + tty + "'");
    } else {
        console.log(err);
    }
};

port.on('error', function (err) {
    return onError(err);
});
port.on('data', function (msg) {
    return onData(msg);
});

_mqttClient2.default.on('message', function (topic, msg) {
    var topics = topic.split('/');
    if (topics[ACTION_TOPIC] === CONTROL) {
        var message = msg + '\r';
        var buffer = new Buffer(message);
        port.write(buffer, function (err) {
            return err ? console.log('Error on write ' + err.message) : console.log('Message written: ' + message.toString());
        });
    }
});
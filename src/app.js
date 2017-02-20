'use strict';
// sudo chmod 666 /dev/ttyUSB0

import parse, { getCrc, checkCrc } from './mqtt/parser';
import Liberiot from './liberiot';
import localClient from './mqtt/mqttClient';

const config = require('../config');
const SerialPort = require('serialport');

const CONTROL = 'control';
const ACTION_TOPIC = 3;
// const CONTROL_TOPIC = 'liberiot/' + config.liberiot.user_key + '/control/#';

const port = new SerialPort(config.serial.port, {
    baudRate: config.serial.speed,
    parser: SerialPort.parsers.readline('\n')
});

localClient.on('connect', () => localClient.subscribe('#'));

const liberiot = new Liberiot();
const liberiotClient = liberiot.getLiberiotMqtt();

const onData = (msg) => {
    if (msg[0] === '(' & msg[5] === ')') {
        let rawData = msg.toString().slice(0, msg.length - 1);
        publishLocal(rawData);
        liberiot.publish(rawData);
    }
};


function publishLocal(msg) {
    let transmission = parse(msg);
    if (transmission) {
        localClient.publish('local/data/' + transmission.uid.full + '/' + transmission.reg, JSON.stringify(transmission));
        console.log('Transmission published at local/' + transmission.uid.full + '/' + transmission.reg);
    }
}

const onError = (err) => {

    if (err.toString() === "Error: Error: Permission denied, cannot open /dev/ttyUSB0") {
        let error = err.toString();
        let errorSplitted = error.split(" ");
        let tty = errorSplitted[errorSplitted.length - 1];
        console.log("Permission denied, please try 'chmod 666 " + tty + "'");
    } else {
        console.log(err);
    }
};

port.on('error', (err) => onError(err));
port.on('data', (msg) => onData(msg));

localClient.on('message', echoLocalMessage);
liberiotClient.on('message', echoLibeirotMessage);

function echoLocalMessage(topic, msg) {
    let topics = topic.split('/');
    if (topics[ACTION_TOPIC] === CONTROL) {
        let message = msg + '\r';
        let buffer = new Buffer(message);
        port.write(buffer, (err) => err ? console.log('Error on write ' + err.message) : console.log('Message written: ' + message.toString()));
    }

}

function echoLibeirotMessage(topic, payload) {
    let msg = payload.toString();
    let topics = topic.split('/');
    if (topics[ACTION_TOPIC] === CONTROL) {
        let message = msg + '\r';
        let buffer = new Buffer(message);
        port.write(buffer, (err) => err ? console.log('Error on write ' + err.message) : console.log('Message written: ' + message.toString()));
    }
}
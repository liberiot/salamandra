'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = require('../../config.json');
var mqtt = require('mqtt');

var localClient = mqtt.connect('mqtt://localhost:' + config.mqtt_broker_port);

localClient.on('connect', function () {
  return console.log('Local MQTT client is up and running');
});

exports.default = localClient;
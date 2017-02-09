'use strict';

var mosca = require('mosca');
var ip = require("ip");

const config = require('../../config.json');

const moscaSettings = {
    port: config.mqtt_broker_port,
};

const server = new mosca.Server(moscaSettings);

server.on('ready', () => console.log('MQTT broker is up and running at ' + ip.address() + ':' + config.mqtt_broker_port));
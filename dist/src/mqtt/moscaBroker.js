'use strict';

var mosca = require('mosca');
var ip = require("ip");

var config = require('../../config.json');

var moscaSettings = {
    port: config.mqtt_broker_port
};

var server = new mosca.Server(moscaSettings);

server.on('ready', function () {
    return console.log('MQTT broker is up and running at ' + ip.address() + ':' + config.mqtt_broker_port);
});
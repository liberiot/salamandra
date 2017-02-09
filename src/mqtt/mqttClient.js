'use strict';

const config = require('../../config.json');
const mqtt = require('mqtt');

const localClient = mqtt.connect('mqtt://localhost:' + config.mqtt_broker_port);

localClient.on('connect', () => console.log('Local MQTT client is up and running'));

export default localClient;

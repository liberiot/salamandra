'use strict';

var config = require('../config');
var Q = require('q');
const mqtt = require('mqtt');

export default class Liberiot {
    constructor() {
        this.config = config;
        this.liberiotClient = mqtt.connect('mqtt://' + this.config.liberiot.server + ':' + this.config.liberiot.port);
        this.liberiotClient.on('connect', () => this.init());
    }

    init() {
        console.log('Liberiot MQTT client is up and running');
        this.getMac()
            .then((mac) => {
                this.config.gateway_key = mac;
                this.publishGatewayCoords();
                this.publishStatus('CONNECTED');
                this.setPeriodicHeartBeat(60);
            })
            .catch((err) => console.error(err));

    }

    publish(msg) {
        this.liberiotClient.publish(this.getNetworkTopic() + '/' + msg.slice(6, 30), msg);
    }

    getMac() {
        var defered = Q.defer();
        require('getmac')
            .getMac((err, mac) => {
                if (err) {
                    defered.reject(err);
                }
                let re = new RegExp(':', 'g');
                let gateway_key = mac.replace(re, "").toUpperCase();
                defered.resolve(gateway_key);
            });
        return defered.promise;
    }

    getNetworkTopic() {
        return this.config.liberiot.main_topic + '/' + this.config.liberiot.user_key + '/' + this.config.gateway_key + '/network';
    }

    getControlTopic() {
        return this.config.liberiot.main_topic + '/' + this.config.liberiot.user_key + '/' + this.config.gateway_key + '/control';
    }

    getGatewayTopic() {
        return this.config.liberiot.main_topic + '/' + this.config.liberiot.user_key + '/' + this.config.gateway_key + '/gateway';
    }

    setPeriodicHeartBeat(interval) {
        setInterval(() => this.publishStatus(), interval * 1000);
    }

    publishStatus(status = 'RUNNING') {
        this.liberiotClient.publish(this.getGatewayTopic(), status);
        console.log(this.getDate() + ' Heartbeat...');
    }

    publishGatewayCoords() {
        let coordinates = this.config.coordinates.latitude + ", " + this.config.coordinates.longitude;
        this.liberiotClient.publish(this.getGatewayTopic() + "/coord", coordinates)
    }

    getDate() {
        let date = new Date();
        return '[' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ']';
    }
}
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require('../config');
var Q = require('q');
var mqtt = require('mqtt');

var Liberiot = function () {
    function Liberiot() {
        var _this = this;

        _classCallCheck(this, Liberiot);

        this.config = config;
        this.liberiotClient = mqtt.connect('mqtt://' + this.config.liberiot.server + ':' + this.config.liberiot.port);
        this.liberiotClient.on('connect', function () {
            return _this.init();
        });
    }

    _createClass(Liberiot, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            console.log('Liberiot MQTT client is up and running');
            this.getMac().then(function (mac) {
                _this2.config.gateway_key = mac;
                _this2.publishGatewayCoords();
                _this2.publishStatus('CONNECTED');
                _this2.publishStatus();
                _this2.setPeriodicHeartBeat(60);
            }).catch(function (err) {
                return console.error(err);
            });
        }
    }, {
        key: 'publish',
        value: function publish(msg) {
            this.liberiotClient.publish(this.getNetworkTopic() + '/' + msg.slice(6, 30), msg);
        }
    }, {
        key: 'getMac',
        value: function getMac() {
            var defered = Q.defer();
            require('getmac').getMac(function (err, mac) {
                if (err) {
                    defered.reject(err);
                }
                var re = new RegExp(':', 'g');
                var gateway_key = mac.replace(re, "").toUpperCase();
                defered.resolve(gateway_key);
            });
            return defered.promise;
        }
    }, {
        key: 'getNetworkTopic',
        value: function getNetworkTopic() {
            return this.config.liberiot.main_topic + '/' + this.config.liberiot.user_key + '/' + this.config.gateway_key + '/network';
        }
    }, {
        key: 'getControlTopic',
        value: function getControlTopic() {
            return this.config.liberiot.main_topic + '/' + this.config.liberiot.user_key + '/' + this.config.gateway_key + '/control';
        }
    }, {
        key: 'getGatewayTopic',
        value: function getGatewayTopic() {
            return this.config.liberiot.main_topic + '/' + this.config.liberiot.user_key + '/' + this.config.gateway_key + '/gateway';
        }
    }, {
        key: 'setPeriodicHeartBeat',
        value: function setPeriodicHeartBeat(interval) {
            var _this3 = this;

            setInterval(function () {
                return _this3.publishStatus();
            }, interval * 1000);
        }
    }, {
        key: 'publishStatus',
        value: function publishStatus() {
            var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'RUNNING';

            this.liberiotClient.publish(this.getGatewayTopic(), status);
            if (status === 'RUNNING') {
                console.log(this.getDate() + ' Heartbeat...');
            }
        }
    }, {
        key: 'publishGatewayCoords',
        value: function publishGatewayCoords() {
            var coordinates = this.config.coordinates.latitude + ", " + this.config.coordinates.longitude;
            this.liberiotClient.publish(this.getGatewayTopic() + "/coord", coordinates);
        }
    }, {
        key: 'getDate',
        value: function getDate() {
            var date = new Date();
            var hours = date.getHours().toString();
            var minutes = date.getMinutes().toString();
            var seconds = date.getSeconds().toString();

            hours.length < 2 ? hours = '0' + hours : null;
            minutes.length < 2 ? minutes = '0' + minutes : null;
            seconds.length < 2 ? seconds = '0' + seconds : null;

            return '[' + hours + ':' + minutes + ':' + seconds + ']';
        }
    }]);

    return Liberiot;
}();

exports.default = Liberiot;
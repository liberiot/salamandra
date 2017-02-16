'use strict';

var userKey = process.argv[2];

if (userKey.length >= 24) {
    var fs = require('fs');
    var config = require('./config');
    config.liberiot.user_key = userKey;
    fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));
    console.log('Using user key ' + userKey);
}

var mqttBroker = require('./src/mqtt/moscaBroker');
var app = require('./src/app');
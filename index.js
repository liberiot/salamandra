'use strict';

const userKey = process.argv[2];

if (userKey) {
    if (userKey.length >= 24) {
        const fs = require('fs');
        let config = require('./config');
        config.liberiot.user_key = userKey;
        fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));
        console.log('Using user key ' + userKey);
    }
}


const mqttBroker = require('./src/mqtt/moscaBroker');
export const app = require('./src/app');
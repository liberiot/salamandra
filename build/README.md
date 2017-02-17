# Salamandra

Salamandra is a local implementation of Liberiot. It acts as any other Liberiot gateway (packet forwarder), transmitting raw GWAP packets to the liberiot cloud and also converting GWAP packets to MQTT locally. This means that Salamandra can be used to pass MQTT packets to a local automation server, enabling local programmings. Salamandra is then specially indicated for home and building automation.

# Installation

Installing Salamandra only requires cloning this repository:

```
git clone https://github.com/liberiot/salamandra.git
```
# Configuring Salamandra

User and system configuration is stored in config.json

```
{
  "mqtt_broker_port": 1884,
  "serial": {
    "port": "/dev/ttyUSB0",
    "speed": 38400
  },
  "liberiot": {
    "server": "mqtt.liberiot.org",
    "port": 3001,
    "main_topic": "liberiot",
    "user_key": "YOUR_USER_KEY"
  },
  "coordinates": {
    "latitude": 42.3438853,
    "longitude": -7.9747611
  }
}
```
User key can be retrieved from the web backend at red.liberiot.org. You can set the user key at this step or later when you run "pm2 start". The rest of parameters that need to be configured are "port", "latitude" and "longitude".

# Running Salamandra

We can run Salamandra manually as follows:

```
cd salamandra/build
npm start
```

Or rely on PM2 to launch Salamandra at startup:

```
cd salamandra/build
pm2 start index.js --name salamandra -- USERKEY
```

Where USERKEY is your Liberiot user key, which can be found in the web backend. After running the above commands we need to save the PM2 list:

```
pm2 save
```
Next time you reboot your system Salamandra should automatically start. You can check this by displaying the list of PM2 processes with

```
pm2 list

```
Another interesting command is "pm2 monit". It displays a nice terminal showing the activity of Salamandra, including wireless traffic and system messages.

```
pm2 monit

```



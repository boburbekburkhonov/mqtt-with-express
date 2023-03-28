import express from 'express';
import mongo from './utils/mongo.js';
import { mqttDataConnect, mqttInfoConnect } from './utils/mqtt.connect.js';

const app = express();

mongo()
  .then(() => console.log('Connect'))
  .catch(err => console.error(err))

// mqttInfoConnect()
mqttDataConnect()

app.listen(9090, console.log(9090))
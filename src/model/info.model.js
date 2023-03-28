import { Schema, model } from "mongoose";

const infoSchema = new Schema({
  imei: {
    type: String,
  },
  time: {
    type: String,
  },
  region: {
    type: String,
  },
  balance_organization: {
    type: String,
  },
  device_name: {
    type: String,
  },
  simCard_id: {
    type: String,
  },
  phone_number_of_the_responsible_employee: {
    type: String,
  },
  location: {
    type: String,
  },
  degree: {
    type: String,
  },
  battery_power: {
    type: String,
  },
  signal: {
    type: String,
  },
  firmware_type: {
    type: String,
  },
  plate_version: {
    type: String,
  },
  p12: {
    type: String,
  },
  time_to_send_information: {
    type: String,
  },
  p14: {
    type: String,
  },
  file_sending_interval: {
    type: String,
  },
  plate_id: {
    type: String,
  },
  sensor_type: {
    type: String,
  },
}, {
  collection: 'info'
})

export default model('info', infoSchema)
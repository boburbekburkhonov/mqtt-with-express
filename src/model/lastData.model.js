import { Schema, model } from "mongoose";

const lastDataSchema = new Schema({
  info_id: {
    type: Schema.Types.ObjectId,
  },
  imei: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  distance: {
    type: String,
    required: true
  },
  volume: {
    type: String,
    required: true
  },
  correction: {
    type: String,
    required: true
  }
}, {
  collection: 'lastData'
})

export default model('lastdata', lastDataSchema)
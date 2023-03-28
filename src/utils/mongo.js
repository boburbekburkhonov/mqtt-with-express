import mongoose from "mongoose";
import dataModel from '../model/data.model.js'
import infoModel from '../model/info.model.js'
import lastDataModel from "../model/lastData.model.js";

export default async() => await mongoose.connect('mongodb://127.0.0.1:27017/n37')
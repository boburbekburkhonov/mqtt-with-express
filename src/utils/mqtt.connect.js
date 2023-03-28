import mqtt from 'mqtt'
import infoModel from '../model/info.model.js';
import dataModel from '../model/data.model.js';
import lastDataModel from '../model/lastData.model.js';

const options = {
  clean: true,
  connectTimeout: 4000,
  host: "185.196.214.190",
  port: 1883,
  username: "emqx",
  password: "12345",
};

const topicData = 'W/+/+/+/data'
const topicInfo = 'W/+/+/+/info'


// ! INFO
export const mqttInfoConnect = () => {
  const client = mqtt.connect(options)

  client.on('connect', () => {
    client.subscribe(topicInfo)
    console.log('Connected');
  })

  client.on('error', (error) => {
    console.log(error);
  })

  client.on('message', async(topicInfo, payload) => {
    let data;
    try {
      data = JSON.parse(payload)
    } catch(error) {
      data = payload
    }

    const foundInfo = await infoModel.findOne({ imei: data.i })
    .catch(err => console.log(err))

    console.log(foundInfo);

    if(foundInfo){
      await infoModel.findOneAndUpdate({ imei: data.i }, {
        imei: data.i, time: data.t, region: data.p1, balance_organization: data.p2, device_name: data.p3, simCard_id: data.p4, phone_number_of_the_responsible_employee: data.p5, location: data.p6, degree: data.p7, battery_power: data.p8, signal: data.p9, firmware_type: data.p10, plate_version: data.p11, p12: data.p12, time_to_send_datarmation: data.p13, p14: data.p14, file_sending_interval: data.p15, plate_id: data.p16, sensor_type: data.p17
      })
    .catch(err => console.log(err))

    }else {
      const newInfo = new infoModel({
        imei: data.i, time: data.t, region: data.p1, balance_organization: data.p2, device_name: data.p3, simCard_id: data.p4, phone_number_of_the_responsible_employee: data.p5, location: data.p6, degree: data.p7, battery_power: data.p8, signal: data.p9, firmware_type: data.p10, plate_version: data.p11, p12: data.p12, time_to_send_datarmation: data.p13, p14: data.p14, file_sending_interval: data.p15, plate_id: data.p16, sensor_type: data.p17
      })

      await newInfo.save()
    .catch(err => console.log(err))
  }
})
}

// ! DATA
export const mqttDataConnect = () => {
  const client = mqtt.connect(options)

  client.on('connect', () => {
    client.subscribe(topicData)
    console.log('Connected');
  })

  client.on('error', (error) => {
    console.log(error);
  })

  client.on('message', async(topicData, payload) => {
    const data = JSON.parse(payload);
    const timeData = new Date(
      `${Number(data.t.split("/")[0]) + 2000}-${data.t.split("/")[1]}-${data.t
        .split("/")[2]
        .slice(0, 2)} ${data.t.split("/")[2].slice(3, 14)}`
    ).toLocaleString({ timeZone: "Asia/Tashkent" });
    let dataInfoId;

    if(data.i == 'OK'){
      return
    }

    try {
      const foundInfoId = await infoModel.findOne({ imei: data.i });
      dataInfoId = foundInfoId?._id;
    } catch (err) {
      console.log(err);
    }

    const newData = new dataModel({
      info_id: dataInfoId,
      imei: data.i,
      time: timeData,
      distance: data.d,
      volume: data.v,
      correction: data.c,
    });
    await newData.save().catch((err) => console.log(err));

    const foundLastData = await lastDataModel.find({ imei: data.i })

    if(foundLastData.length > 0){
      await lastDataModel.findOneAndUpdate({imei: data.i}, {
        info_id: dataInfoId,
        imei: data.i,
        time: timeData,
        distance: data.d,
        volume: data.v,
        correction: data.c,
      })
      .catch((err) => console.log(err));
    }else {
      const newLastData = new lastDataModel({
        info_id: dataInfoId,
        imei: data.i,
        time: timeData,
        distance: data.d,
        volume: data.v,
        correction: data.c,
      })

      await newLastData.save().catch((err) => console.log(err));
    }
  })
}
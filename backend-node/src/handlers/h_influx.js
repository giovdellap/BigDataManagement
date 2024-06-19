const influx = require('@influxdata/influxdb-client')
//import {InfluxDB, Point} from '@influxdata/influxdb-client'

class InfluxDBHandler {

    influxDB = {}
    
    url = "http://localhost:8086"
    token = "Ph9-lWs0podQxKiQQlBEkqOm-pzm2Uz2hrzgEw_x-8sMb8FA7v9kz5Po8dL0pgALUe22V-jAU-ZbzjL9Z97VtA=="
    org = "my-org"
    bucket = "testina"

    constructor() {
      console.log("url: ", this.url)
      this.influxDB = new influx.InfluxDB({url : this.url, token : this.token})
    }

    write(data) {
        let writeApi = this.influxDB.getWriteApi(this.org, this.bucket)
        console.log('dat: ', data[0])
        for (let i = 0; i < data.length; i++) {
            let point = this.logItemToPoint(data[i])
            writeApi.writePoint(point)

        }
        writeApi.close()
    }

    logItemToPoint(item) {
      console.log(item.model)
      return new influx.Point("interrogation")
      .tag("customer", item.customer)
      .tag("model", item.model.model)
      .tag("version", item.model.version)
      .floatField("gen", item.relevations.generations)
      .floatField("sat", item.relevations.satisfaction)
      .floatField("wli", item.relevations.wli)
      .timestamp(item.timestamp)
    }
  }

module.exports = {
  InfluxDBHandler
}

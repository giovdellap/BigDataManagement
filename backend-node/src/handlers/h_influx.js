const {InfluxDB, HttpError} = require('@influxdata/influxdb-client')
const {OrgsAPI, BucketsAPI} = require('@influxdata/influxdb-client-apis')
const { DBHandler } = require('./h_dbhandler')
const { LogItemToPoint, RequestToPoint } = require('./influxdb/influx_utils')
//import {InfluxDB, Point} from '@influxdata/influxdb-client'

class InfluxDBHandler extends DBHandler{
    
  url = "http://influxdb:8086"
  token = "kUERQvP1fV7Tra0oo1CbaRIsqHgixJS_qgp5H02zmXOq3dtU0s8O-CGCecPMoWMo1riv5hS3WsJHHr"
  org = "my-org"
  bucket = "my-bucket"

  constructor() {
    super()
    console.log("url: ", this.url)
    this.client = new InfluxDB({url : this.url, token : this.token})
  }

  async insertMultipleItems(type, items) {
    
    let points = []
    for (let i = 0; i < items.length; i++) {
      let point = {}
      if (type === "LOGS") {
        point = LogItemToPoint(items[i])
      } else {
        point = RequestToPoint(items[i])
      }
      points.push(point)
    }

    let writeApi = this.client.getWriteApi(this.org, this.bucket)
    writeApi.writePoints(points)
    await this.closeConnection(writeApi)
  }

  async insertLogItem(item) {
    let point = LogItemToPoint(item)
    let writeApi = this.client.getWriteApi(this.org, this.bucket)
    writeApi.writePoint(point)
    await this.closeConnection(writeApi)
  }
  
  async insertRequestItem(item) {
    let point = RequestToPoint(item)
    let writeApi = this.client.getWriteApi(this.org, this.bucket)
    writeApi.writePoint(point)
    await this.closeConnection(writeApi)
  }

  async closeConnection(writeApi) {
    try {
      await writeApi.close()
      console.log('FINISHED')
    } catch (e) {
      console.error(e)
      if (e instanceof HttpError && e.statusCode === 401) {
        console.log('Httperror', e)
      }
      console.log('\nFinished ERROR')
    }
  }
}

module.exports = {
  InfluxDBHandler
}

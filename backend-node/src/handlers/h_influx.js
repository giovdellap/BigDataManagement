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
    //console.log("url: ", this.url)
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

  async satisfactionQuery(field) {

    const queryApi = this.client.getQueryApi(this.org)

    const fluxQuery =
    'from(bucket:"my-bucket") |> range(start: -1d) |> filter(fn: (r) => r._measurement == "temperature")'
    console.log('*** IterateRows ***')
    for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
    // the following line creates an object for each row
    const o = tableMeta.toObject(values)
    // console.log(JSON.stringify(o, null, 2))
    console.log(
      `${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`
    )

    // alternatively, you can get only a specific column value without
    // the need to create an object for every row
    // console.log(tableMeta.get(row, '_time'))
  }
  console.log('\nIterateRows SUCCESS')
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

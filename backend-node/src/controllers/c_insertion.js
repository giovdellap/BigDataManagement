const { DataFactory } = require("../factories/datafactory.js")
const influxhandler = require("../handlers/h_influx.js")
const { CassandraDBHandler } = require("../handlers/h_cassandra.js")

const insertLogs = ((req, res) => {


  const date = new Date(
    req.body.year,
    req.body.month,
    req.body.day,
    req.body.hour,
    0
  )
  console.log('date: ', date)
  const dataFactory = new DataFactory()
  dataFactory.generateOneHour(date)
  
  const cassandraHandler = new CassandraDBHandler()
  const writeLogs = ( async (logSet) => {
    //await cassandraHandler.initializeDB()
    for (let i = 0; i < logSet.length; i++) {
      await cassandraHandler.insertLogItem(logSet[i])
    }
  })
  writeLogs(dataFactory.logSet)

  const writeRequests = ( async (requestSet) => {
    //await cassandraHandler.initializeDB()
    for (let i = 0; i < requestSet.length; i++) {
      await cassandraHandler.insertRequestItem(requestSet[i])
    }
  })
  writeRequests(dataFactory.requestSet)
  
  //influxHandler = new influxhandler.InfluxDBHandler()
  //influxHandler.write(set)
  res.json({text: dataFactory.logSet})
})
  
module.exports = {
  insertLogs
}
  
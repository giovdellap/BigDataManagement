const { DataFactory } = require("../factories/datafactory.js")
const { InfluxDBHandler} = require("../handlers/h_influx.js")
const { CassandraDBHandler } = require("../handlers/h_cassandra.js")
const { DBHandler } = require("../handlers/h_dbhandler.js")

const initializeDB = ( async (req, res) => {
  dbHandler = new InfluxDBHandler()
  await dbHandler.initialize()
  res.json({text: "OK"})

})


const insertLogs = ( async (req, res) => {

  const date = new Date(
    req.body.year,
    req.body.month,
    req.body.day,
    req.body.hour,
    0
  )
  let db = req.body.db
  let dbHandler = new DBHandler()

  // DATA GENERATION
  const dataFactory = new DataFactory()
  dataFactory.generateOneHour(date)

  // DB INSERTION
  if (db === "cassandra") {
    dbHandler = new CassandraDBHandler()
  } else {
    dbHandler = new InfluxDBHandler()
  }
  
  await dbHandler.insertMultipleItems("LOGS", dataFactory.logSet)
  await dbHandler.insertMultipleItems("REQUESTS", dataFactory.requestSet)
   
  //influxHandler = new influxhandler.InfluxDBHandler()
  //influxHandler.write(set)
  res.json({text: dataFactory.logSet})
})
  
module.exports = {
  insertLogs,
  initializeDB
}
  
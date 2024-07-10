const { DataFactory } = require("../factories/datafactory.js")
const { InfluxDBHandler} = require("../handlers/h_influx.js")
const { CassandraDBHandler } = require("../handlers/h_cassandra.js")
const { DBHandler } = require("../handlers/h_dbhandler.js")
const { getHandler } = require("./controller_utils.js")

const initializeDB = ( async (req, res) => {
  let dbHandler = getHandler(req.body.db)
  await dbHandler.initialize()
  res.json({text: "OK"})

})

const insertOneDay = ( async (req, res) => {

  const date = new Date(
    req.body.year,
    req.body.month,
    req.body.day,
    req.body.hour,
    0
  )
  let dbHandler = getHandler(req.body.db)

  // DATA GENERATION
  const dataFactory = new DataFactory()
  dataFactory.generateOneDay(date)

  // DB INSERTION 
  console.log("DB INSERTION - INITIALIZATION")
  await dbHandler.insertMultipleItems("LOGS", dataFactory.logSet)
  console.log("DB INSERTION - LOGSET OK")
  await dbHandler.insertMultipleItems("REQUESTS", dataFactory.requestSet)
  console.log("DB INSERTION - REQUESTSET OK")

  res.json({text: dataFactory.logSet})
})

const insertLogs = ( async (req, res) => {

  const date = new Date(
    req.body.year,
    req.body.month,
    req.body.day,
    req.body.hour,
    0
  )
  let dbHandler = getHandler(req.body.db)

  // DATA GENERATION
  const dataFactory = new DataFactory()
  dataFactory.generateOneHour(date)

  // DB INSERTION 
  await dbHandler.insertMultipleItems("LOGS", dataFactory.logSet)
  await dbHandler.insertMultipleItems("REQUESTS", dataFactory.requestSet)
   

  res.json({text: dataFactory.logSet})
})
  
module.exports = {
  insertLogs,
  initializeDB,
  insertOneDay
}
  
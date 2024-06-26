const logfactory = require("../factories/factory.js")
const logorder =require("../model/m_logorder.js")
const influxhandler = require("../handlers/h_influx.js")
const { CouchBaseHandler } = require("../handlers/h_couch.js")
const { CassandraDBHandler } = require("../handlers/h_cassandra.js")

const insertTest = ((req, res) => {

  factory = new logfactory.LogFactory()
  order = new logorder.LogOrder(new Date(2024, 5, 19, 0), 3)

  set = factory.generateTestSet(order)
  
  cassandraHandler = new CassandraDBHandler()

  console.log('prima di tutto')
  const write =  ( async () => {
    //await cassandraHandler.initializeDB()
    await cassandraHandler.testDB(set[0])

  })

  write()

  
  //influxHandler = new influxhandler.InfluxDBHandler()
  //influxHandler.write(set)
  res.json({text: set})
})
  
module.exports = {insertTest}
  
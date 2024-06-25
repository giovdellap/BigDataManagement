const logfactory = require("../factories/factory.js")
const logorder =require("../model/m_logorder.js")
const influxhandler = require("../handlers/h_influx.js")
const { CouchBaseHandler } = require("../handlers/h_couch.js")

const insertTest = ((req, res) => {

  factory = new logfactory.LogFactory()
  order = new logorder.LogOrder(new Date(2024, 5, 19, 0), 3)

  set = factory.generateTestSet(order)
  
  handler = new CouchBaseHandler()
  console.log('prima di tutto')
  const write =  ( async () => {
    console.log('controller - dentro write')
    await handler.connectToDatabase()
    console.log('controller - dentro write 2')
    //await handler.writeItem()
  })

  write()

  
  //influxHandler = new influxhandler.InfluxDBHandler()
  //influxHandler.write(set)
  res.json({text: set})
})
  
module.exports = {insertTest}
  
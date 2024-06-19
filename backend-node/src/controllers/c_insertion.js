const logfactory = require("../factories/factory.js")
const logorder =require("../model/m_logorder.js")
const influxhandler = require("../handlers/h_influx.js")

const insertTest = ((req, res) => {

  factory = new logfactory.LogFactory()
  order = new logorder.LogOrder(new Date(2024, 5, 19, 0), 3)

  set = factory.generateTestSet(order)
  influxHandler = new influxhandler.InfluxDBHandler()
  influxHandler.write(set)
  res.json({text: set})
})
  
module.exports = {insertTest}
  
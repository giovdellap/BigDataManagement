const { LogFactory } = require("../factories/factory.js")
const { LogOrder } =require("../model/m_logorder.js")
const influxhandler = require("../handlers/h_influx.js")
const { CassandraDBHandler } = require("../handlers/h_cassandra.js")

const insertLogs = ((req, res) => {


  const date = new Date(
    req.body.year,
    req.body.month,
    req.body.day,
    req.body.hour
  )
  const rate = req.body.rate
  console.log('date: ', date)
  const logFactory = new LogFactory()
  let order = new LogOrder(date, rate)
  let set = logFactory.generateTestSet(order)
  console.log('first item: ', set[0])
  console.log('set length: ', set.length)
  
  const cassandraHandler = new CassandraDBHandler()
  const write =  ( async (set) => {
    //await cassandraHandler.initializeDB()
    for (let i = 0; i < set.length; i++) {
      await cassandraHandler.insertItem(set[i])
    }
  })
  write(set)

  
  //influxHandler = new influxhandler.InfluxDBHandler()
  //influxHandler.write(set)
  res.json({text: set})
})
  
module.exports = {
  insertLogs
}
  
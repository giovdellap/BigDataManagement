const { countItems, roundFloats, roundToInt, groupBy, calculateMean } = require("./utils/queryUtils")
const { getHandler } = require("./controller_utils")

const basicQuery = ( async (req, res) => {

  const field1 = req.body.field1
  const field2 = req.body.field2
  const model_filter = req.body.model_filter

  let response = []
  let dbHandler = getHandler(req.body.db)

  let dbResponse = await dbHandler.basicQuery(field1, field2, model_filter)
  console.log("RESPONSE LENGTH: ", dbResponse.length)
  let arr = roundFloats(dbResponse, [field1, field2])
  response = countItems(arr, field1, field2) 
  
  res.json(response)
})

const basicQueryNoCount = ( async (req, res) => {

  const field1 = req.body.field1
  const field2 = req.body.field2
  const model_filter = req.body.model_filter

  //let response = []
  let dbHandler = getHandler(req.body.db)

  let dbResponse = await dbHandler.basicQuery(field1, field2, model_filter)

  console.log("RESPONSE LENGTH: ", dbResponse.length)
  //let arr = roundFloats(dbResponse, [field1, field2])
  //response = countItems(arr, field1, field2) 
  
  res.json(dbResponse)
})

const linechartQuery = ( async (req, res) => {

  const field1 = req.body.field1
  const field2 = req.body.field2
  const model_filter = req.body.model_filter

  //let response = []
  let dbHandler = getHandler(req.body.db)

  let dbResponse = await dbHandler.basicQuery(field1, field2, model_filter)
  console.log("RESPONSE LENGTH: ", dbResponse.length)
  let response = calculateMean(dbResponse, field1, field2)

  //let arr = roundFloats(dbResponse, [field1, field2])
  //response = countItems(arr, field1, field2) 
  
  res.json(response)
})


const wliBoxplotQuery = ( async (req, res) => {

  const field = req.body.field
  const model_filter = req.body.model_filter

  let response = []
  let dbHandler = getHandler(req.body.db)

  let dbResponse = await dbHandler.basicQuery('wli', field, model_filter)
  //console.log(dbResponse)
  console.log("RESPONSE LENGTH: ", dbResponse.length)
  //let arr = roundToInt(dbResponse, [field, 'wli'])
  response = groupBy(dbResponse, 'wli', field) 
  
  res.json(response)
})

const basicRequestQuery = ( async (req, res) => {

  const field = req.body.field

  let response = []
  let dbHandler = getHandler(req.body.db)

  let dbResponse = await dbHandler.basicRequestQuery(field)
  console.log("RESPONSE LENGTH: ", dbResponse.length)
  //let arr = roundFloats(dbResponse, [field1, field2])
  response = countItems(dbResponse, field, "loading_time") 
  
  res.json(response)
})

const test = ( async (req, res) => {

  let dbHandler = getHandler(req.body.db)

  let dbResponse = await dbHandler.test()
  console.log("dbResponse: ", dbResponse)
  //console.log("RESPONSE LENGTH: ", dbResponse.length)
  //let arr = roundFloats(dbResponse, [field1, field2])
  res.json(dbResponse)

})

  
module.exports = {
  basicQuery,
  basicQueryNoCount,
  wliBoxplotQuery,
  basicRequestQuery,
  test,
  linechartQuery
}
  
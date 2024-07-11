const { countItems, roundFloats } = require("../utils/queryUtils")
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
  response = arr
  if (field2 !== "token") {
    response = countItems(arr, field1, field2) 
  } else {
    response = arr
  }
  res.json(response)
})
  
module.exports = {
  basicQuery
}
  
const { countItems, roundFloats } = require("../utils/queryUtils")
const { getHandler } = require("./controller_utils")

const satisfactionQuery = ( async (req, res) => {
  let response = []
  let dbHandler = getHandler(req.body.db)
  const field = req.body.field
  let dbResponse = await dbHandler.satisfactionQuery(field)
  let arr = roundFloats(dbResponse.rows, ['satisfaction', field])
  if (field !== "token") {
    response = countItems(arr, "satisfaction", field) 
  } else {
    response = arr
  }
  res.json(response)
})
  
module.exports = {
  satisfactionQuery
}
  
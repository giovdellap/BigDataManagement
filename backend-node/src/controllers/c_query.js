const { getHandler } = require("./controller_utils")

const satisfactionQuery = ( async (req, res) => {
  let dbHandler = getHandler(req.body.db)
  let response = await dbHandler.satisfactionQuery(req.body.field)
  res.json({result: response.rows})

})
  
module.exports = {
  satisfactionQuery
}
  
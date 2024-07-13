var express = require('express');
const queryController = require("../controllers/c_query")

const queryRouter = express.Router();
queryRouter.post('/basicQuery', queryController.basicQuery)
queryRouter.post('/basicQueryNoCount', queryController.basicQueryNoCount)
queryRouter.post('/wliboxplotquery', queryController.wliBoxplotQuery)

module.exports = queryRouter;
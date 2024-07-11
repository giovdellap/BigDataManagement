var express = require('express');
const queryController = require("../controllers/c_query")

const queryRouter = express.Router();
queryRouter.post('/basicQuery', queryController.basicQuery)

module.exports = queryRouter;
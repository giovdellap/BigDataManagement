var express = require('express');
const insertionController = require("../controllers/c_insertion")

const insertionRouter = express.Router();
insertionRouter.post('/insertLogs', insertionController.insertLogs);

module.exports = insertionRouter;
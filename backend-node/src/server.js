var express = require('express');

const insertionRouter = require("./routes/r_insertion.js")
// const insertionRouter = require("./routes/r_insertion")

const app = express();
app.use(express.json())
app.use(express.urlencoded())
const PORT = 5001;

//app.use(bodyParser.urlencoded({ extended: false }));
app.use('/insertion', insertionRouter);
app.listen(PORT, console.log('Server is running on port: ' + PORT));
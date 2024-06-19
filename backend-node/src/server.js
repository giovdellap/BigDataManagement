var express = require('express');

const insertionRouter = require("./routes/r_insertion.js")
// const insertionRouter = require("./routes/r_insertion")

const app = express();
app.use(express.json());
const PORT = 5001;


app.use('/insertion', insertionRouter);
app.listen(PORT, console.log('Server is running on port: ' + PORT));
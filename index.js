const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const recenziiRouter = require('./router/recenziiRouter');
const utilsRouter = require('./router/utilsRouter');

const app = express();
app.use(cors());

// for parsing application/json
app.use(bodyParser.json()); 
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use("/messages", recenziiRouter);
app.use("/utils", utilsRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Cloud computing app listening on port ${port}!`)
});
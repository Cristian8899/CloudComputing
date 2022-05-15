const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const recenziiRouter = require('./router/recenziiRouter');




const app= express();
app.use(cors());



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use("/messages",recenziiRouter);

const port= process.env.PORT || 8080;

 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});


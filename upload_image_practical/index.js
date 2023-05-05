var http = require('http');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require("./server/routes/userRoutes");
const port=3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/user',userRoutes);
app.get('/',(req,res)=>{
    res.send('Welcome to Node js');
})

app.listen(port,()=>{
console.log("listen port 3000");
})

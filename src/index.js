const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const mongodb = require('./config/db');

app.use(cors());
app.use(express.json());

app.post('/',(req,res)=>{
     
        res.send('ok');
       // console.log(req.body.name);
});

let port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server runing ${port}`)
})
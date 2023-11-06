const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const mongodb = require('./config/db');
const userRouter = require('./routes/UserRoute');
const UserLogin = require('./controllers/UserLogin');
const ChangePassword = require('./controllers/ChangePassword');

app.use(cors());
app.use(express.json());
app.use('/api/user',userRouter);
app.use('/api/user',UserLogin);
app.use('/api/user',ChangePassword);


let port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server runing ${port}`)
})
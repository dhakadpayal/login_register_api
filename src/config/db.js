const mongoose = require("mongoose");
 const mongodb = mongoose.connect("mongodb://localhost:27017/login")
.then(()=>{
    console.log('connected')
}).catch(()=>{
    console.log("connection failed")
})
module.exports = mongodb;
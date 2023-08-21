const mongoose = require('mongoose');

mongoose.connect(process.env.DB).then(()=>{
    console.log("connection successfull");
}).catch((e)=>{
console.log(e);
})
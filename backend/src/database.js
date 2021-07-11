const mongoose = require("mongoose");

const uri =process.env.MONGODB_URI?
           process.env.MONGODB_URI:
           'mongodb://localhost:27017/bastardos';

mongoose.connect(uri,{
    useUnifiedTopology:true,
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false    
})

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("DB is connected")
});


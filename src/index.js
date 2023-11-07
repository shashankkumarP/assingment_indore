const mongoose = require('mongoose');
const express = require("express");
const cors = require('cors');
const { PORT, MONGO_URL } = require('./config');
const { userRouter } = require('./router');
const app = express();

app.use(express.json());
app.use(cors());


app.use('/user',userRouter)

app.get('/',(req,res)=>{
   return res.status(200).json('working');
})

app.listen(PORT,async()=>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log('connected');

    }catch(error){
        console.log(`Error: ${error}`);

    }
   
})

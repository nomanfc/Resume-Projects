//All Imports here
const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Routes
const userRoutes = require('./routes/user')

//code body starts here
env.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

//MongoDB Database Settings
const PASS = process.env.MONGODB_PASSWORD;
const USER = process.env.MONGODB_USER_ID;
const DATABASE = process.env.MONGODB_DATABASE;
mongoose.connect(
   `mongodb+srv://${USER}:${PASS}@cluster0.f6ijt.mongodb.net/${DATABASE}?retryWrites=true&w=majority`,
   {
       useFindAndModify: true,
       useUnifiedTopology: true, 
       connectTimeoutMS: 10000,
       poolSize: 10,
       writeConcern: {
           j: true
       }
   }
).then(()=>{
    console.log('Server Connected To Database');
})

//MiddleWares APIS
app.use('/api',userRoutes);



const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is Running on port: ${PORT}`)
})
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authroute from './routes/authroute.js';
import userroute from './routes/userroute.js';
import postroute from './routes/postroute.js'
import uploadroute from './routes/uploadroute.js'
import profileroute from './routes/profileimage.js'

import dotenv from 'dotenv';
const app = express();

app.use(express.static('public'));
app.use('/images',express.static('images'))

app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}))
app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use(cookieParser())

dotenv.config();

mongoose.connect(process.env.CONN_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>app.listen(process.env.PORT,()=>console.log(`listening at ${process.env.PORT}`)))
.catch((err)=>console.log(err));

app.use('/auth',authroute);
app.use('/user',userroute);
app.use('/post',postroute);
app.use('/upload',uploadroute);
app.use('/profileimage',profileroute);
app.get('*',(req,res)=>{
    res.send("Login Please.....")
})
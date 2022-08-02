import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './routes/auth.js';

dotenv.config()

const app = express()

app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(cors(
    {
        origin: 'https://ums-client.netlify.app',
        credentials: true
    }
))

app.use('/api', router)

const uri = process.env.MONGO_URI;

const Entry = async() =>{
    try {
        const cnn = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        cnn && console.log('connected to DB') 
    } catch (error) {
        console.log(`error in connecting to DB: ${error}`) 
    }
}

Entry();

// mongoose.connection.on('error', (err)=> { console.log(`error in connecting to DB: ${err}`)})
// mongoose.connection.once('open', ()=> { console.log(`connected to DB!`)})

const PORT = process.env.PORT

app.listen(PORT, ()=>{ console.log(`listening on port ${PORT}`)})
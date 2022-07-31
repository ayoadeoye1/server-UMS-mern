import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './routes/auth.js';

dotenv.config()

const app = express()

app.options('*', cors())

app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(cors())

app.use('/api', router)


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
// .then(()=>{
//     console.log('connected to DB');
// })
mongoose.connection.on('error', (err)=> { console.log(`error in connecting to DB: ${err}`)})
mongoose.connection.once('open', ()=> { console.log(`connected to DB!`)})

const PORT = process.env.PORT

app.listen(PORT, ()=>{ console.log(`listening on port ${PORT}`)})
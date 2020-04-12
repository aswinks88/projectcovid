import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import confirmedRoute from './Routes/CovidNzData.route'
import Stats from './Routes/CovidNzData.route'
import Dhbdata from './Routes/CovidNzData.route'
require('dotenv').config({debug: process.env.DEBUG })

const port = process.env.PORT || 5000
const uri = process.env.ATLAS_URI
const connection = mongoose.connection
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
.catch((err => {
    console.log(err)
}))

connection.once('open', () => {
    console.log('mongodb connection established successfully')
})

app.use('/', confirmedRoute)
app.use('/stats', Stats)
app.use('/dhbdata', Dhbdata)
app.listen(port, () =>{
    console.log(`server is running on port: http://localhost:${port}`)
})


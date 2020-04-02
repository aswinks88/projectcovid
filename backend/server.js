import express from 'express'
import mongoose, { mongo } from 'mongoose'
import cors from 'cors'
import confirmedRoute from './Routes/CovidNzData.route'
require('dotenv').config

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

app.listen(port, () =>{
    console.log(`server is running on port: http://localhost:${port}`)
})


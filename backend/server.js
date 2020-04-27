const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const confirmedRoute = require('./Routes/CovidNzData.route')
const path = require('path')
// import express from 'express'
// // import mongoose from 'mongoose'
// import cors from 'cors'
// import bodyParser from 'body-parser'
// import confirmedRoute from './Routes/CovidNzData.route'
// import path from 'path'
// import Stats from './Routes/CovidNzData.route'
// import Dhbdata from './Routes/CovidNzData.route'
// import recoveryDataCount from './Routes/CovidNzData.route'
require('dotenv').config({debug: process.env.DEBUG })

const port = process.env.PORT || 5000
// const uri = process.env.ATLAS_URI
// const connection = mongoose.connection
const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
// .catch((err => {
//     console.log(err)
// }))

// connection.once('open', () => {
//     console.log('mongodb connection established successfully')
// })

app.use('/', confirmedRoute)
app.use('/stats',  confirmedRoute)
app.use('/dhbdata',  confirmedRoute)
app.use('/recovery',  confirmedRoute)
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/build')))
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'build','index.html'))
    })
    console.log('production mode')

}

app.listen(port, () =>{
    console.log(path.resolve(__dirname,'build','index.html'))
    console.log(`server is running on port: http://localhost:${port}`)
})


const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coviddataSchema = new Schema({
    confirmedcases: {
        total: {type: Number, required: true},
        new:  {type: Number, required: true}
    },
    recoveredcases: {
        total: {type: Number, required: true},
        new:  {type: Number, required: true}
    },
    casesinhospital: {
        total: {type: Number, required: true},
        new:  {type: Number, required: true}
    },
    deaths: {
        total: {type: Number, required: true},
        new:  {type: Number, required: true}
    },
    probablecases: {
        total: {type: Number, required: true},
        new:  {type: Number, required: true}
    },
    date: {
        total: {type: Number, required: true},
        new:  {type: Number, required: true}
    }
})

const Nzdata = mongoose.model('Nzdata', coviddataSchema)

module.exports =  Nzdata
const router = require('express').Router()
const Nzdata = require('../Models/CovidNzData.model')
const {covid19TotalCount} = require('../ScrapeApi/ScrapeApi')
const {ManageDb} = require('../db/db')


router.route('/').get(async (req, res) => {
    const caseResult = await covid19TotalCount()
    return res.json(caseResult)
    
})

router.route('/stats').get(async(req, res)=>{
     Nzdata.find()
    .then(caseResult => res.json(caseResult))
    .catch(err => res.status(400).json('Error: ' + err))
})
module.exports = router


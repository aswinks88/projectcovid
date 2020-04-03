import axios from 'axios'
import cheerio from 'cheerio'
const URL = 'https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases'

export async function getHTML(url){
    const {data: html} = await axios.get(url)
    return html
}

export async function findCovid19TotalCases(ministryofHealthData){
    const $ = cheerio.load(ministryofHealthData)
    const summaryData = $('.table-style-two').first()
    let totalSummaryofCases = []
    let totalToDate = []
    let newInLast = []
    summaryData.each((i, el) => {
        $(el).find('tbody > tr > td:nth-child(2)').each((i, el) => {
            totalToDate.push($(el).text())
            // console.log(totalToDate)
        })

        $(el).find('tbody > tr > td:nth-child(3)').each((i, el) => {
            newInLast.push($(el).text())
            // console.log(newInLast)
        })

        for(let i =0; i<totalToDate.length; i++){
            totalSummaryofCases.push(`${totalToDate[i]}`,  `${newInLast[i]}`)
        }
    })
    return totalSummaryofCases
}

export async function covid19TotalCount(){
    const ministryofHealthData = await getHTML(URL)
    const totalCases = await findCovid19TotalCases(ministryofHealthData)
    console.log(`Total number of cases including probable cases in New Zealand: ${totalCases}`)
    return totalCases
}
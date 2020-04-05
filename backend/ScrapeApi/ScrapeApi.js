import axios from 'axios'
import cheerio from 'cheerio'
const URL = {currentcases: 'https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases',
                currentcasesdetails:'https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases/covid-19-current-cases-details',
            githubCSSEGISandData:'https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'}
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
        })

        $(el).find('tbody > tr > td:nth-child(3)').each((i, el) => {
            newInLast.push($(el).text())
        })

        for(let i =0; i<totalToDate.length; i++){
            totalSummaryofCases.push(`${totalToDate[i]}`,  `${newInLast[i]}`)
        }
    })
    return totalSummaryofCases
}

export async function findCovidDataOvertheTime(githubData){
    const $ = cheerio.load(githubData)
    const totalcasesOvertimeNumber = $('#LC172')
    const totalcasesOvertimeDate = $('#LC1')
    const totalConfirmedCases = []
    const dates = []
    const cases = []
    totalcasesOvertimeDate.each((i, el) => {
        $(el).find('th').each((i, el) => {
            dates.push($(el).text())
        })
    })
    totalcasesOvertimeNumber.each((i,el) => {
        $(el).find('td').each((i,el) => {
            cases.push($(el).text().replace(/^\s+|\s+$|\s+(?=\s)/g, ""))
        })
    })
 
    for(let i = 5 ; i< cases.length; i++){
        totalConfirmedCases.push(dates[i - 1], cases[i])
    }
    return totalConfirmedCases
}

export async function covid19TotalCount(){
    const ministryofHealthData = await getHTML(URL.currentcases)
    const totalCases = await findCovid19TotalCases(ministryofHealthData)
    return totalCases
}

export async function covid19TotalOverTime(){
    
    const githubData = await getHTML(URL.githubCSSEGISandData)
    const casesOverTime = await findCovidDataOvertheTime(githubData)
    return casesOverTime
}
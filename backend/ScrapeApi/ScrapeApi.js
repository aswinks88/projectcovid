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
    const casesbyDHB = $('.table-style-two').eq(1)
    const summary = []

    // function fetchDataofSummaryTable() {
        $(summaryData).each((i, el) => {
            const $element = $(el)
            const summaryofCases = $element.find('tbody > tr > th')
            const $totalToDate = $element.find('tbody > tr > td:nth-child(2)')
            const $newInLast = $element.find('tbody > tr > td:nth-child(3)')
            for(let i=0; i < $totalToDate.length; i++){
                
                const summaryofTable = {
                    casesSummaryHead: summaryofCases.eq(i).text(),
                    TotaltoDate: $totalToDate.eq(i).text(),
                    last: $newInLast.eq(i).text()
                }  
            summary.push(summaryofTable)
            }
           
            // console.log(summary)
            // return summary
        })
    // }
    return summary

//     casesbyDHB.each((i, el) => {
//         $(el).find('tbody > tr > td:nth-child(1)').each((i, el) => {
//             totalCasesDhb.dhb.push($(el).text())
//         })
//         // console.log(totalCasesDhb)
//         $(el).find('tbody > tr > td:nth-child(2)').each((i, el) => {
//             totalCasesDhb.totalcases.push($(el).text())
//         })
//         $(el).find('tbody > tr > td:nth-child(3)').each((i, el) => {
//             totalCasesDhb.lastTwentyfourhrs.push($(el).text())
//         })

//         // console.log(totalCasesDhb.dhb)
//         // console.log(totalSummaryofCases)
//     })
//     totalSummaryofCases.push(totalCasesDhb)
//         // console.log(totalSummaryofCases)

//     let promises = await Promise.all(totalSummaryofCases)
//     // console.log(totalSummaryofCases[13])

//     return promises
}

export async function findCovidDataOvertheTime(githubData){
    const $ = cheerio.load(githubData)
    const totalcasesOvertimeNumber = $('#LC172')
    const totalcasesOvertimeDate = $('#LC1')
    const  totalConfirmedCases = []
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
    //here variable i is initialised to 40 in order to move 40 places in the data table so that we can scrape the data
    // from 26/02/20 2 days before the first case registered in NZ.
    for(let i = 40 ; i< cases.length; i++){
        totalConfirmedCases.push(dates[i - 1], cases[i])
    }
    return totalConfirmedCases
}

export async function covid19TotalCount(){
    const ministryofHealthData = await getHTML(URL.currentcases)
    const totalCases = await findCovid19TotalCases(ministryofHealthData)
    // console.log(totalCases)
    return totalCases
}

export async function covid19TotalOverTime(){
    
    const githubData = await getHTML(URL.githubCSSEGISandData)
    const casesOverTime = await findCovidDataOvertheTime(githubData)
    return casesOverTime
}
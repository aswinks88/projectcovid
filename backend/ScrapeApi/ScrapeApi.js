import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'
import Path from 'path'
import https from 'https'
const URL = {currentcases: 'https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases',
            currentcasesdetails:'https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases/covid-19-current-cases-details',
            githubCSSEGISandData:'https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv',
            recoveryDataCSSEGIS: 'https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv',
            deathRateCSSEGIS: 'https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv'}
export async function getHTML(url){
    const {data: html} = await axios.get(url)
    return html
}

export async function findCovid19TotalCases(ministryofHealthData,  currentcasesdetails){
    const $ = cheerio.load(ministryofHealthData)
    const summaryData = $('.table-style-two').first()
    const summary = []

 //scraping the download link from another page but from the same site
    const $$ = cheerio.load(currentcasesdetails)
    const totalCasesPage = $$('.field-item')
    const downloadLink = []

    $$(totalCasesPage).each((i,el)=>{
        const pageContent = $$(el)
        const anchorTag = pageContent.find('ul').eq(1).find('li > a')
        downloadLink.push(anchorTag.attr('href'))
    })

    const path = Path.resolve(__dirname, 'files', 'cases.xlsx')
    const url = `https://www.health.govt.nz${downloadLink[0]}`
    // request.get(url).pipe(fs.createWriteStream(path))
    console.log(1, url)
    // papaParser.parse(url, {
    //     download:true,
    //     complete: (res) => {
    //         console.log(res)
    //     }
    // })
https.get(url, (response) => {
    response.pipe(fs.createWriteStream(path))
})
    // fileDownload(url, path, err => {
    //     if(err) throw err
    //     console.log('success')
    // })
    // await axios.get(url, { responseType: 'stream'})
    // .then(response => {
    //     response.data.pipe(fs.createWriteStream(path))
    // }).catch(err => {
    //     console.log(err)
    // })
    //Reading CSV file 
    // fs.createReadStream('./covidcase_list_15_april_2020.xlsx')
    // .pipe(csvParser())
    // .on('data', row => {
    //     console.log(row)
    // })
    // .on('end',()=>{
    //     console.log()
    // })


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
        })

return summary

}
export async function casesbyDHB(ministryofHealthData){
    const $ = cheerio.load(ministryofHealthData)
    const casesbyDHB = $('.table-style-two').eq(1)
    const casesinDHB = []
    
    casesbyDHB.each((i, el) => {
        const $DhbElement = $(el)
        const $dhbName = $DhbElement.find('tbody > tr > td:nth-child(1)')
        const $numofActiveCases = $DhbElement.find('tbody > tr > td:nth-child(2)')
        const $numofRecoveredCases = $DhbElement.find('tbody > tr > td:nth-child(3)')
        const $numofDeceased = $DhbElement.find('tbody > tr > td:nth-child(4)')
        const $totalCases = $DhbElement.find('tbody > tr > td:nth-child(5)')
        const $lastTwentyfourhrs = $DhbElement.find('tbody > tr > td:nth-child(6)')
        // console.log($dhbName.text())
        for(let i = 0; i < $dhbName.length; i++){
            const DHBall = {
                Place: $dhbName.eq(i).text(),
                cases: $numofActiveCases.eq(i).text(),
                recovered: $numofRecoveredCases.eq(i).text(),
                deceased:  $numofDeceased.eq(i).text(),
                total: $totalCases.eq(i).text(),
                changes: $lastTwentyfourhrs.eq(i).text()
            }
            casesinDHB.push(DHBall)
            // console.log(casesinDHB)
        }
    })
    // const readGeojson = await fs.readFileSync('./ScrapeApi/nz1.json', 'utf8', (err, data) => {
    //     if(err){
    //         console.log(err)
    //     }
    //     else{
    //         return data
    //     }
    // })
    // let parsedJsonData = JSON.parse(readGeojson)
    // console.log(parsedJsonData[0].properties.NAME)
    // for(let i = 0; i< parsedJsonData.length; i++){ 
    //     for(let j = 0; j< casesinDHB.length; j++){
    //         if(parsedJsonData[i].properties.NAME === casesinDHB[j].Place){
    //         // console.log(parsedJsonData.features[i].properties.NAME, casesinDHB[j].Place, parsedJsonData.features[i].properties.DHB12)

    //         parsedJsonData[i].properties.active = casesinDHB[j].cases
    //         parsedJsonData[i].properties.recovered = casesinDHB[j].recovered
    //         parsedJsonData[i].properties.deceased = casesinDHB[j].deceased
    //         parsedJsonData[i].properties.total = casesinDHB[j].total
    //         parsedJsonData[i].properties.changes = casesinDHB[j].changes
    //                 fs.writeFile('../frontend/src/components/Maps/nz1.json',  JSON.stringify(parsedJsonData), (err) =>{
    //                     console.log(err)
    //                 }) 
                
    //         } 
    //     }   
    // } 
return casesinDHB

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
    totalConfirmedCases.filter(filterDate => {
        if(filterDate === '3/22/20'){
           const index =  totalConfirmedCases.indexOf('102')
           totalConfirmedCases[index] = '66'
        }
    })
    return totalConfirmedCases
}

export async function fetchRecoveryData(csseDatalink, deathRateLink){
    //loading recovery rate URL
const $ = cheerio.load(csseDatalink)
const recoveryData = $('#LC169')
const recoveryDates = $('#LC1')
const totalRecoverydata = []
const dates = []
const recoveryCases = []
recoveryData.each((i, el) => {
    $(el).find('td').each((i, el)=>{
        recoveryCases.push($(el).text().replace(/^\s+|\s+$|\s+(?=\s)/g, ""))
    })
})

recoveryDates.each((i, el) => {
    $(el).find('th').each((i, el)=>{
        dates.push($(el).text())
    })
})

//loading death rate URL
const $$ = cheerio.load(deathRateLink)
// const deathRatedate = $$('#LC1')
const deathCases = $$('#LC172')
const totalDeathRate = []
const dailyDeathrate = []
deathCases.each((i, el) => {
    $$(el).find('td').each((i, el) => {
        dailyDeathrate.push($$(el).text())
    })
})
// console.log(dailyDeathrate)
for(let i =60; i<recoveryCases.length; i++){
    totalRecoverydata.push(dates[i - 1], recoveryCases[i])
}
for(let i =60; i<dailyDeathrate.length; i++){
    totalDeathRate.push(dailyDeathrate[i])
}


// console.log(totalRecoverydata.html())
return  {totalRecoverydata,
    totalDeathRate}
}





export async function covid19TotalCount(){
    const ministryofHealthData = await getHTML(URL.currentcases)
    const currentcasesdetails = await getHTML(URL.currentcasesdetails)
    const totalCases = await findCovid19TotalCases(ministryofHealthData,  currentcasesdetails)
    return totalCases
}
export async function TotalCasesbyDHB(){
    const ministryofHealthData = await getHTML(URL.currentcases)
    const totalCasesbyDHB = await casesbyDHB(ministryofHealthData)
    return totalCasesbyDHB
}

export async function covid19TotalOverTime(){
    
    const githubData = await getHTML(URL.githubCSSEGISandData)
    const casesOverTime = await findCovidDataOvertheTime(githubData)
    return casesOverTime
}

export async function recoveryDataCount(){
    const recoveryDatagithub = await getHTML(URL.recoveryDataCSSEGIS)
    const deathRate = await getHTML(URL.deathRateCSSEGIS)
    const recoveryResults = await fetchRecoveryData(recoveryDatagithub, deathRate)
    return recoveryResults
}
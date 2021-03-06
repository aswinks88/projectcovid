const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const Path = require("path");
const https = require("https");
const url = require("url");
const xlreader = require("read-excel-file/node");
const xltojson = require("convert-excel-to-json");
const Promise = require("promise");

const URL = {
  currentcases:
    "https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases",
  currentcasesdetails:
    "https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases/covid-19-current-cases-details",
  githubCSSEGISandData:
    "https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv",
  recoveryDataCSSEGIS:
    "https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv",
  deathRateCSSEGIS:
    "https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv",
};
async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}

async function ageGroupGenderaffected(currentcasesdetails) {
  const $$ = cheerio.load(currentcasesdetails);
  const totalCasesPage = $$(".field-item");
  const downloadLink = [];

  $$(totalCasesPage).each((i, el) => {
    const pageContent = $$(el);

    const anchorTag = pageContent
      .find("ul")
      .eq(1)
      .find("li")
      .eq(0)
      .find("a")
      .attr("href");
    downloadLink.push(anchorTag);
  });

  const downloadUrl = `https://www.health.govt.nz${downloadLink[1]}`;
  const filename = url.parse(downloadUrl).pathname.split("/").pop();
  const path = Path.resolve(__dirname, "files", filename);
  const pathtoJsonResult = Path.join(__dirname, "files");
  fs.readdir(pathtoJsonResult, async (err, existingfile) => {
    if (filename === existingfile[0]) {
      console.log("file exist");
    } else if (!existingfile[0] || filename !== existingfile[0]) {
      fs.unlinkSync(pathtoJsonResult + `/${existingfile[0]}`);
      const fileWrite = fs.createWriteStream(path);
      https
        .get(downloadUrl, (res) => {
          res
            .on("data", (data) => {
              fileWrite.write(data);
            })
            .on("end", () => {
              fileWrite.end();
              console.log(filename + " downloaded to " + path);
            });
        })
        .on("error", (err) => {
          console.log(err);
        });
    }
  });
  return path;
}
async function convertXLtoJSON(fileSourcePath) {
  const jsonResult = xltojson({
    sourceFile: fileSourcePath,
    header: {
      rows: 4,
    },
    columnToKey: {
      A: "Date of report",
      B: "Sex",
      C: "Age group",
      D: "DHB",
      E: "Overseas travel",
      F: "Last country before return",
      G: "Flight number",
      H: "Flight departure date",
      I: "Arrival date",
    },
  });
  return jsonResult;
}
async function genderData(xltojsonresult) {
  const parsedData = xltojsonresult;
  const ageGroup = [];
  const result = [];
  const filterByAge = [];
  for (let i = 0; i < parsedData.Confirmed.length; i++) {
    ageGroup.push(parsedData.Confirmed[i]["Age group"]);
    ageGroup.forEach((el) => {
      if (!result.includes(el)) {
        result.push(el);
      }
    });
  }
  for (let i = 0; i < parsedData.Confirmed.length; i++) {
    if (
      parsedData.Confirmed[i].Sex === "Male" ||
      parsedData.Confirmed[i].Sex === undefined
    ) {
      const confirmedMalegroup = {
        ageGroup: parsedData.Confirmed[i]["Age group"],
        gender:
          parsedData.Confirmed[i].Sex === undefined
            ? "undefined"
            : parsedData.Confirmed[i].Sex,
        overseasTravel: parsedData.Confirmed[i]["Overseas travel"],
        lastCountry: parsedData.Confirmed[i]["Last country before return"],
      };
      filterByAge.push(confirmedMalegroup);
    } else if (parsedData.Confirmed[i].Sex === "Female") {
      const confirmedFemalegroup = {
        ageGroup: parsedData.Confirmed[i]["Age group"],
        gender:
          parsedData.Confirmed[i].Sex === undefined
            ? "undefined"
            : parsedData.Confirmed[i].Sex,
        overseasTravel: parsedData.Confirmed[i]["Overseas travel"],
        lastCountry: parsedData.Confirmed[i]["Last country before return"],
      };
      filterByAge.push(confirmedFemalegroup);
    }
  }
  for (let i = 0; i < parsedData.Probable.length; i++) {
    if (
      parsedData.Probable[i].Sex === "Male" ||
      parsedData.Probable[i].Sex === undefined
    ) {
      const ProbableMalegroup = {
        ageGroup: parsedData.Probable[i]["Age group"],
        gender:
          parsedData.Probable[i].Sex === undefined
            ? "undefined"
            : parsedData.Probable[i].Sex,
        overseasTravel: parsedData.Probable[i]["Overseas travel"],
        lastCountry: parsedData.Probable[i]["Last country before return"],
      };
      filterByAge.push(ProbableMalegroup);
    } else if (parsedData.Probable[i].Sex === "Female") {
      const ProbableFemalegroup = {
        ageGroup: parsedData.Probable[i]["Age group"],
        gender:
          parsedData.Probable[i].Sex === undefined
            ? "undefined"
            : parsedData.Probable[i].Sex,
        overseasTravel: parsedData.Probable[i]["Overseas travel"],
        lastCountry: parsedData.Probable[i]["Last country before return"],
      };
      filterByAge.push(ProbableFemalegroup);
    }
  }
  return { result, filterByAge };
}

async function findCovid19TotalCases(ministryofHealthData) {
  const $ = cheerio.load(ministryofHealthData);
  const summaryData = $(".table-style-two").first();
  const summary = [];
  $(summaryData).each((i, el) => {
    const $element = $(el);
    const lastUpdatedTime = { lastUpdated: $element.find("caption").text() };
    const summaryofCases = $element.find("tbody > tr > th");
    const $totalToDate = $element.find("tbody > tr > td:nth-child(2)");
    const $newInLast = $element.find("tbody > tr > td:nth-child(3)");
    for (let i = 0; i < $totalToDate.length; i++) {
      const summaryofTable = {
        casesSummaryHead: summaryofCases.eq(i).text(),
        TotaltoDate: $totalToDate.eq(i).text(),
        last: $newInLast.eq(i).text(),
      };
      summary.push(summaryofTable);
    }
    summary.push(lastUpdatedTime);
  });
  return summary;
}
async function casesbyDHB(ministryofHealthData) {
  const $ = cheerio.load(ministryofHealthData);
  const casesbyDHB = $(".table-style-two").eq(2);
  const casesinDHB = [];

  casesbyDHB.each((i, el) => {
    const $DhbElement = $(el);
    const $dhbName = $DhbElement.find("tbody > tr > td:nth-child(1)");
    const $numofActiveCases = $DhbElement.find("tbody > tr > td:nth-child(2)");
    const $numofRecoveredCases = $DhbElement.find(
      "tbody > tr > td:nth-child(3)"
    );
    const $numofDeceased = $DhbElement.find("tbody > tr > td:nth-child(4)");
    const $totalCases = $DhbElement.find("tbody > tr > td:nth-child(5)");
    const $lastTwentyfourhrs = $DhbElement.find("tbody > tr > td:nth-child(6)");
    for (let i = 0; i < $dhbName.length; i++) {
      const DHBall = {
        Place: $dhbName
          .eq(i)
          .text()
          .normalize("NFKD")
          .replace(/[^\w\s.-_\/]/g, ""),
        cases: $numofActiveCases.eq(i).text(),
        recovered: $numofRecoveredCases.eq(i).text(),
        deceased: $numofDeceased.eq(i).text(),
        total: $totalCases.eq(i).text(),
        changes: $lastTwentyfourhrs.eq(i).text(),
      };
      casesinDHB.push(DHBall);
    }
  });

  const readGeojson = await fs.readFileSync(
    "./ScrapeApi/nz1.json",
    "utf8",
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        return data;
      }
    }
  );
  let parsedJsonData = JSON.parse(readGeojson);
  for (let i = 0; i < parsedJsonData.length; i++) {
    for (let j = 0; j < casesinDHB.length; j++) {
      if (parsedJsonData[i].properties.NAME === casesinDHB[j].Place) {
        parsedJsonData[i].properties.active = casesinDHB[j].cases;
        parsedJsonData[i].properties.recovered = casesinDHB[j].recovered;
        parsedJsonData[i].properties.deceased = casesinDHB[j].deceased;
        parsedJsonData[i].properties.total = casesinDHB[j].total;
        parsedJsonData[i].properties.changes = casesinDHB[j].changes;
        fs.writeFile(
          "../frontend/src/components/Maps/nz1.json",
          JSON.stringify(parsedJsonData),
          (err) => {
            console.log(err);
          }
        );
      }
    }
  }
  return casesinDHB;
}
async function findCovidDataOvertheTime(githubData) {
  const $ = cheerio.load(githubData);
  const totalcasesOvertimeNumber = $("#LC193");
  const totalcasesOvertimeDate = $("#LC1");
  const totalConfirmedCases = [];
  const dates = [];
  const cases = [];
  totalcasesOvertimeDate.each((i, el) => {
    $(el)
      .find("th")
      .each((i, el) => {
        dates.push($(el).text());
      });
  });
  totalcasesOvertimeNumber.each((i, el) => {
    $(el)
      .find("td")
      .each((i, el) => {
        cases.push(
          $(el)
            .text()
            .replace(/^\s+|\s+$|\s+(?=\s)/g, "")
        );
      });
  });
  //here variable i is initialised to 40 in order to move 40 places in the data table so that we can push the data
  // from 26/02/20 2 days before the first case registered in NZ.
  for (let i = 40; i < cases.length; i++) {
    totalConfirmedCases.push(dates[i - 1], cases[i]);
  }
  //data from csse john hopkin university shows 102 instead of 66 cases on 22/03/2020.
  // So we have to make sure the wrong data is replaced with the correct one
  totalConfirmedCases.filter((filterDate) => {
    if (filterDate === "3/22/20") {
      const index = totalConfirmedCases.indexOf("102");
      totalConfirmedCases[index] = "66";
    }
  });
  return totalConfirmedCases;
}

async function fetchRecoveryData(csseDatalink, deathRateLink) {
  //loading recovery rate URL
  const $ = cheerio.load(csseDatalink);
  const recoveryData = $("#LC180");
  const recoveryDates = $("#LC1");
  const totalRecoverydata = [];
  const dates = [];
  const recoveryCases = [];
  recoveryData.each((i, el) => {
    $(el)
      .find("td")
      .each((i, el) => {
        recoveryCases.push(
          $(el)
            .text()
            .replace(/^\s+|\s+$|\s+(?=\s)/g, "")
        );
      });
  });

  recoveryDates.each((i, el) => {
    $(el)
      .find("th")
      .each((i, el) => {
        dates.push($(el).text());
      });
  });

  //loading death rate URL
  const $$ = cheerio.load(deathRateLink);
  const deathCases = $$("#LC193");
  const totalDeathRate = [];
  const dailyDeathrate = [];
  deathCases.each((i, el) => {
    $$(el)
      .find("td")
      .each((i, el) => {
        dailyDeathrate.push($$(el).text());
      });
  });

  for (let i = 60; i < recoveryCases.length; i++) {
    totalRecoverydata.push(dates[i - 1], recoveryCases[i]);
  }
  for (let i = 60; i < dailyDeathrate.length; i++) {
    totalDeathRate.push(dailyDeathrate[i]);
  }
  return { totalRecoverydata, totalDeathRate };
}

async function covid19TotalCount() {
  const ministryofHealthData = await getHTML(URL.currentcases);
  const totalCases = await findCovid19TotalCases(ministryofHealthData);
  return totalCases;
}
async function TotalCasesbyDHB() {
  const ministryofHealthData = await getHTML(URL.currentcases);
  const totalCasesbyDHB = await casesbyDHB(ministryofHealthData);
  return totalCasesbyDHB;
}

async function covid19TotalOverTime() {
  const githubData = await getHTML(URL.githubCSSEGISandData);
  const casesOverTime = await findCovidDataOvertheTime(githubData);
  return casesOverTime;
}

async function recoveryDataCount() {
  const recoveryDatagithub = await getHTML(URL.recoveryDataCSSEGIS);
  const deathRate = await getHTML(URL.deathRateCSSEGIS);
  const recoveryResults = await fetchRecoveryData(
    recoveryDatagithub,
    deathRate
  );
  return recoveryResults;
}
async function genderAffected() {
  //
  const currentcasesdetails = await getHTML(URL.currentcasesdetails);
  const totalAffected = await ageGroupGenderaffected(currentcasesdetails);
  //waiting for this to be done until we move on and call next
  await new Promise((wait) => setTimeout(wait, 3000));
  const covertXLtoJson = await convertXLtoJSON(totalAffected);
  const jsonResult = await genderData(covertXLtoJson);
  return jsonResult;
}
module.exports = {
  covid19TotalCount,
  TotalCasesbyDHB,
  covid19TotalOverTime,
  recoveryDataCount,
  genderAffected,
};

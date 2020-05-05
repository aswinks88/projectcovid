import React from 'react'
import './Footer.css'

const Footer = () => {
    return(
     <footer className='container-footer page-footer'>
       
            <div className = 'sources'>
                <p>&#9432; Data Sources</p>
                <p><a href='https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases'>Ministry of Health, New Zealand</a></p>
                <p><a href='https://github.com/CSSEGISandData/COVID-19'>COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University</a></p>
            </div>
       
    </footer>)
}

export default Footer
import React from 'react'
import './Summary.css'
import wreath from './wreat-red.png'
import hospital from './hospital.png'
import survivor from './survival.png'
import covidicon from './coronavirus.png'
export default function Summary(props) {
     const Summary = [
         {totalcases : '', casesLastin: ''}, 
         {totalRecovered: '', recoveredLastin: ''},
         {totalDeath: '', deathLastin : ''},
         {totalHospital: '', hospitalLastin: ''},
         {activeCases:'', activeLastin: ''},
         {lastUpdated: ''}
     ]
     props.data.filter((total, index) => {
           if(total.casesSummaryHead === 'Number of confirmed and probable cases'){
               Summary.totalcases = total.TotaltoDate
               Summary.casesLastin = total.last
           } else if(total.casesSummaryHead === 'Number of recovered cases') {
               Summary.totalRecovered = total.TotaltoDate
               Summary.recoveredLastin = total.last
           } else if(total.casesSummaryHead === 'Number of deaths'){
               Summary.totalDeath = total.TotaltoDate
               Summary.deathLastin = total.last
           } else if(total.casesSummaryHead === 'Number of cases currently in hospital'){
               Summary.totalHospital = total.TotaltoDate
               Summary.hospitalLastin = total.last
           } else if(total.casesSummaryHead === 'Number of active cases'){
               Summary.activeCases = total.TotaltoDate
               Summary.activeLastin = total.last
           }
           Summary.lastUpdated =  total.lastUpdated
     })
    return (
          <div className='container content'>
        
          {/* <section className='content'> */}
         
               <div className='row clearfix'>
                    <div className='container top'>
                    <small className='last-update'>Last updated: {Summary.lastUpdated}</small>
                    <h2>COVID-19 STATS</h2> 
                    <p className='active-cases'>Active:&nbsp;{Summary.activeCases}<span>({Summary.activeLastin > 0 ? <i className="fas fa-arrow-up up-arrow active-up">{Summary.activeLastin}</i>
                    :<i className="fas fa-arrow-down down-arrow">{Summary.activeLastin}</i> })</span></p>
                    <div className='row stats nz'>
                         <div className='col-6 col-sm-6 col-md-2 text-center'>
                              <p className='confirmed cases'> &nbsp;
                                  <img src ={covidicon} width = '25' height='25' alt='covidicon'/>{Summary.totalcases }
                                   </p>
                              <p className='confirmed diff'>( {Summary.casesLastin > 0 ?  <i className="fas fa-arrow-up up-arrow">&nbsp;{ Summary.casesLastin}</i>
                          :  Summary.casesLastin <= 0 ?  <i className="fas fa-arrow-down down-arrow">&nbsp;{ Summary.casesLastin}</i> : 0})</p>
                              <p>Impacted Soldiers</p>
                              
                         </div>
                         <div className='col-6 col-sm-6 col-md-2 text-center'>
                              
                         <p className='death red cases'>
                              <img src ={wreath} width = '25' height='25' alt='wreath'/>{Summary.totalDeath}
                              </p>
                              <p className='death diff'>({Summary.deathLastin > 0 ?  <i className="fas fa-arrow-up up-arrow">&nbsp;{Summary.deathLastin}</i>
                          : Summary.deathLastin< 0 ? <i className="fas fa-arrow-down down-arrow">&nbsp;{Summary.deathLastin}</i> : 0})</p>
                              <p>Casualties of War</p>
                         </div>

                         <div className='col-6 col-sm-6 col-md-2 text-center'>

                              <p className='recovered cases'>
                              <img src ={survivor} width = '25' height='25' alt='Survivor'/>{Summary.totalRecovered} 
                              </p>
                              <p className='recovered green diff'>({Summary.recoveredLastin > 0 ?  <i className="fas fa-arrow-up up-arrow">&nbsp;{Summary.recoveredLastin}</i>
                          : Summary.recoveredLastin< 0 ?  <i className="fas fa-arrow-down down-arrow">&nbsp;{Summary.recoveredLastin}</i> : 0})</p>
                              <p>Survivors</p>
                         </div>

                         <div className='col-6 col-sm-6 col-md-2 text-center'>
                         <p className='hospital cases'>
                              <img src ={hospital} width = '25' height='25' alt='hospital'/>{Summary.totalHospital}
                              </p>
                              <p className='hospital green diff'>({Summary.hospitalLastin > 0 ?  <i className="fas fa-arrow-up up-arrow hosup">&nbsp;{Summary.hospitalLastin}</i>
                          : Summary.hospitalLastin<  0 ?  <i className="fas fa-arrow-down down-arrow ">&nbsp;{Summary.hospitalLastin}</i>:0})</p>
                              <p>In Hospital</p>
                              
                         </div>
                         <div className='col-6 col-sm-6 col-md-2 text-center'>
                         <p className='fatality cases'>{props.death}%</p>
                              <p>Fatality Rate</p>
                         </div>
                         <div className='col-6 col-sm-6 col-md-2 text-center'>
                         <p className='recovery cases'>{props.recovery}%</p>
                              <p>Recovery Rate</p>
                         </div>
                    </div>
                    </div>
               </div>
        
          {/* </section> */}
          
           
         </div>
        
    )
}

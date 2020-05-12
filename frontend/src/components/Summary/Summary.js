import React from 'react'
import './Summary.css'
// import CovidGlobalCases from '../CovidGlobalData/CovidGlobalData'
import wreath from './wreat-red.png'
import hospital from './hospital.png'
import survivor from './survival.png'
import covidicon from './coronavirus.png'
export default function Summary(props) {
    const TotaltoDate = props.data.map((el) => {
          return el.TotaltoDate
     })
     const NewinLast = props.data.map((el) => {
          return el.last
     })
     const lastUpdated = props.data.filter((el)=>{
          return el[6]
     })
    return (
          <div className='container content'>
        
          {/* <section className='content'> */}
         
               <div className='row clearfix'>
                    <div className='container top'>
                    <small className='last-update'>Last updated: {lastUpdated}</small>
                    <h2>COVID-19 STATS</h2>
                    <div className='row stats nz'>
                         <div className='col-6 col-sm-6 col-md-2 text-center'>
                              <p className='confirmed cases'> &nbsp;
                                  <img src ={covidicon} width = '25' height='25' alt='covidicon'/>{TotaltoDate[2]}
                                   </p>
                              <p className='confirmed diff'>( {NewinLast[2] > 0 ?  <i className="fas fa-arrow-up up-arrow">&nbsp;{NewinLast[2]}</i>
                          : NewinLast[2]<= 0 ?  <i className="fas fa-arrow-down down-arrow">&nbsp;{NewinLast[2]}</i> : 0})</p>
                              <p>Impacted Soldiers</p>
                              
                         </div>
                         <div className='col-6 col-sm-6 col-md-2 text-center'>
                              
                         <p className='death red cases'>
                              <img src ={wreath} width = '25' height='25' alt='wreath'/>{TotaltoDate[5]}
                              </p>
                              <p className='death diff'>({NewinLast[5] > 0 ?  <i className="fas fa-arrow-up up-arrow">&nbsp;{NewinLast[3]}</i>
                          : NewinLast[3]< 0 ? <i className="fas fa-arrow-down down-arrow">&nbsp;{NewinLast[5]}</i> : 0})</p>
                              <p>Casualities of War</p>
                         </div>

                         <div className='col-6 col-sm-6 col-md-2 text-center'>

                              <p className='recovered cases'>
                              <img src ={survivor} width = '25' height='25' alt='Survivor'/>{TotaltoDate[4]} 
                              </p>
                              <p className='recovered green diff'>({NewinLast[4] > 0 ?  <i className="fas fa-arrow-up up-arrow">&nbsp;{NewinLast[4]}</i>
                          : NewinLast[3]< 0 ?  <i className="fas fa-arrow-down down-arrow">&nbsp;{NewinLast[3]}</i> : 0})</p>
                              <p>Survivors</p>
                         </div>

                         <div className='col-6 col-sm-6 col-md-2 text-center'>
                         <p className='hospital cases'>
                              <img src ={hospital} width = '25' height='25' alt='hospital'/>{TotaltoDate[3]}
                              </p>
                              <p className='hospital green diff'>({NewinLast[3] > 0 ?  <i className="fas fa-arrow-up up-arrow hosup">&nbsp;{NewinLast[3]}</i>
                          : NewinLast[3]<  0 ?  <i className="fas fa-arrow-down down-arrow ">&nbsp;{NewinLast[3]}</i>:0})</p>
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

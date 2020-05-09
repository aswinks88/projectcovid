import React, {useState,useEffect} from 'react'
import './Summary.css'
import CovidGlobalCases from '../CovidGlobalData/CovidGlobalData'
import ChartComponent from '../Chart/ChartComponent'
import wreath from './wreat-red.png'
import hospital from './hospital.png'
import survivor from './survival.png'
import covidicon from './coronavirus.png'
export default function Summary(props) {
     const [Data, setData] = useState()
    const TotaltoDate = props.data.map((el) => {
          return el.TotaltoDate
     })
     const NewinLast = props.data.map((el) => {
          return el.last
     })
    return (
         <div>
        
          <section className='content'>
          <div className='container-fluid'>
               <div className='row clearfix'>
                    <div className='container top'>
                    <h2>COVID-19 STATS</h2>
                    <div className='row stats nz'>
                         <div className='col-6 col-sm-6 col-md-2 text-center'>
                              <p className='confirmed cases'>{TotaltoDate[2]}</p>
                              <p className='confirmed diff'>( {NewinLast[2] > 0 ?  <i className="fas fa-arrow-up up-arrow">&nbsp;{NewinLast[2]}</i>
                          : NewinLast[2]<= 0 ?  <i className="fas fa-arrow-down down-arrow">&nbsp;{NewinLast[2]}</i> : 0})</p>
                              <p>Impacted Soldiers</p>
                              <img src ={covidicon} width = '25' height='25' />
                         </div>
                         <div className='col-6 col-sm-6 col-md-2 text-center'>
                         <p className='death red cases'>{TotaltoDate[5]}</p>
                              <p className='death diff'>({NewinLast[5] > 0 ?  <i className="fas fa-arrow-up up-arrow">&nbsp;{NewinLast[3]}</i>
                          : NewinLast[3]< 0 ? <i className="fas fa-arrow-down down-arrow">&nbsp;{NewinLast[5]}</i> : 0})</p>
                              <p>Casualities of War</p>
                              <img src ={wreath} width = '25' height='25' />
                         </div>
                         <div className='col-6 col-sm-6 col-md-2 text-center'>
                              <p className='recovered cases'>{TotaltoDate[4]}</p>
                              <p className='recovered green diff'>({NewinLast[4] > 0 ?  <i className="fas fa-arrow-up up-arrow">&nbsp;{NewinLast[4]}</i>
                          : NewinLast[3]<= 0 ?  <i className="fas fa-arrow-down down-arrow">&nbsp;{NewinLast[3]}</i> : 0})</p>
                              <p>Survivor</p>
                              <img src ={survivor} width = '25' height='25' />
                         </div>
                         <div className='col-6 col-sm-6 col-md-2 text-center'>
                         <p className='hospital cases'>{TotaltoDate[3]}</p>
                              <p className='hospital green diff'>({NewinLast[3] > 0 ?  <i className="fas fa-arrow-up up-arrow hosup">&nbsp;{NewinLast[3]}</i>
                          : NewinLast[3]<= 0 ?  <i className="fas fa-arrow-down down-arrow ">&nbsp;{NewinLast[3]}</i>:0})</p>
                              <p>In Hospital</p>
                              <img src ={hospital} width = '25' height='25' />
                         </div>
                         <div className='col-6 col-sm-6 col-md-2 text-center'>
                         <p className='fatality cases'>{props.death}%</p>
                              <p>Fatality Rate</p>
                         </div>
                         <div className='col-6 col-sm-6 col-md-2 text-center'>
                         <p className='fatality cases'>{props.recovery}%</p>
                              <p>Recovery Rate</p>
                         </div>
                    </div>
                    </div>
                    
               </div>
          </div>
          </section>
          
           
         </div>
        
    )
}

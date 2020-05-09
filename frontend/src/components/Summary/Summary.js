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
               {/* <div className='block-header'>
                    <h4>Summary</h4>
               </div> */}
               <div className='row clearfix'>
                    <div className = 'col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                         <div className='card'>
                         {/* <div className='header'>
                              <h2>Summary</h2>
                         </div> */}
                         <div className='body bg-cyan'>
                              <div className='font-weight-bold'>Summary</div>
                              <ul className='stat-list'>
                                   <li>
                                   {/* <i className="fas fa-virus"> </i>  */}
                                   <img src ={covidicon} width = '25' height='25' />&nbsp;

                                   
                                   IMPACTED SOLDIERS 
                                       
                                       <span className='fa-pull-right'> 
                                       <b> {TotaltoDate[2]}(
                                        {NewinLast[2] > 0 ?  <i className="fas fa-arrow-up up-arrow">{NewinLast[2]}</i>
                          : NewinLast[2]<= 0 ?  <i className="fas fa-arrow-down down-arrow">{NewinLast[2]}</i> : 0})</b>
                                       </span>        
                                   </li>
                                   <li>
                                   {/* <i className="fas fa-house-user"></i> */}
                                   <img src ={survivor} width = '25' height='25' />&nbsp;
                                   SURVIVORS
                                    
                                       <span className='fa-pull-right'>  
                                       <b> {TotaltoDate[4]}({NewinLast[4] > 0 ?  <i className="fas fa-arrow-up up-arrow">{NewinLast[4]}</i>
                          : NewinLast[3]<= 0 ?  <i className="fas fa-arrow-down down-arrow">{NewinLast[3]}</i> : 0})</b>
                                       </span>    
                                   </li>
                                   <li>
                                   {/* <i className="fas fa-hospital-alt"></i>  */}
                                   <img src ={hospital} width = '25' height='25' />
                                   &nbsp;
                                   WARRIORS
                                       
                                       <span className='fa-pull-right'> 
                                       <b> {TotaltoDate[3]}({NewinLast[3] > 0 ?  <i className="fas fa-arrow-up up-arrow">{NewinLast[3]}</i>
                          : NewinLast[3]<= 0 ?  <i className="fas fa-arrow-down down-arrow">{NewinLast[3]}</i>:0})</b>
                                       </span>                                             
                                   </li>
                                   <li> 
                                        {/* <i className="fas fa-head-side-virus"></i> */}
                                        <img src ={wreath} width = '25' height='25' />
                                         &nbsp;
                                        CASUALITIES OF WAR
                                     
                                       <span className='fa-pull-right'> 
                                       <b> {TotaltoDate[5]}({NewinLast[5] > 0 ?  <i className="fas fa-arrow-up up-arrow">{NewinLast[3]}</i>
                          : NewinLast[3]<= 0 ? <i className="fas fa-arrow-down down-arrow">{NewinLast[5]}</i> : 0})</b>
                                       </span>                                             
                                   </li>
                              </ul>
                         </div>
                         </div>
                    </div>
                    <CovidGlobalCases />
                    <div className = 'col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                         <div className='card'>
                         <div className='body bg-pink'>
                              <div className='font-weight-bold'>Fatality rate</div>
                              <div className='death-rate'>{`${props.death}%`}</div>
               
                         </div>
                         </div>
                    </div>
                    <div className = 'col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                         <div className='card'>
                         <div className='body bg-teal'>
                              <div className='font-weight-bold'>Recovery rate</div>
                              <div className='death-rate'>{`${props.recovery}%`}</div>
                         </div>
                         </div>
                    </div>
                    {/* <div className='col-12 col-lg-6 col-xl'>
                    <div className='bg-info info-box'>
                    <div className='icon'>
                    <i className="fas fa-virus"></i>

                    </div>
                    <div className='content'>
                         <div className='text'>
                         Confirmed cases
                         </div>
                         <div className='number count-to'>{TotaltoDate[2]}
                              (
                                   {NewinLast[2] > 0 &&  <i className="fas fa-arrow-up up-arrow">{NewinLast[2]}</i>
                          || NewinLast[2]<= 0 &&  <i className="fas fa-arrow-down down-arrow">{NewinLast[2]}</i>}
                              )
                             </div>
                    </div>
                    </div>
                    </div>

                    <div className='col-12 col-lg-6 col-xl'>
                    <div className='info-box bg-success'>
                    <div className='icon'>
                    <i className="fas fa-house-user"></i>
                    </div>
                    <div className='content'>
                         <div className='text'>
                         Recovered
                         </div>
                         <div className='number count-to'>{TotaltoDate[4]}
                        
                         (<i className="fas fa-arrow-up up-arrow"></i>{NewinLast[4]})
                         </div>

                    </div>
                    </div>
                    </div>

                    <div className='col-12 col-lg-6 col-xl'>
                    <div className='info-box bg-orange'>
                    <div className='icon'>
                    <i className="fas fa-hospital-alt"></i>
                    </div>
                    <div className='content'>
                         <div className='text'>
                         Cases in hospital
                         </div>
                         <div className='number count-to'>{TotaltoDate[3]}
                        ({NewinLast[3] > 0 &&  <i className="fas fa-arrow-up up-arrow">{NewinLast[3]}</i>
                          || NewinLast[3]<= 0 &&  <i className="fas fa-arrow-down down-arrow">{NewinLast[3]}</i>})
                         </div>

                    </div>
                    </div>
                    </div>
                    <div className='col-12 col-lg-6 col-xl'>
                    <div className='info-box bg-danger'>
                    <div className='icon'>
                    <i className="fas fa-head-side-virus"></i>
                    </div>
                    <div className='content'>
                         <div className='text'>
                         Death
                         </div>
                         <div className='number count-to'>{TotaltoDate[5]}
                             ({NewinLast[5] > 0 && <i className="fas fa-arrow-up up-arrow">{NewinLast[5]}</i>
                              || NewinLast[5] <= 0 && <i className="fas fa-arrow-down up-down">{NewinLast[5]}</i>})
                         
                         </div>

                    </div>
                    </div>
                    </div> */}
                    
               </div>
          </div>
          </section>
          
           
         </div>
        
    )
}

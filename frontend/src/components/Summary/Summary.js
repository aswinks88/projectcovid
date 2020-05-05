import React, {useState,useEffect} from 'react'
import './Summary.css'
// import Graph from '../Chart/Chart'

export default function Summary(props) {
     // const {Data, useData} = useState()
     // useData(props.data)
     // useEffect(() => {
     //      console.log(Data)
     // })
     console.log(`its props data ${props}`)
    const TotaltoDate = props.data.map((el) => {
          return el.TotaltoDate
     })
     const NewinLast = props.data.map((el) => {
          return el.last
     })
     // const data = props.data
     // console.log(TotaltoDate)
    return (
         <div>
        
          <section className='content'>
          <div className='container-fluid'>
               <div className='block-header'>
                    <h4>Summary</h4>
               </div>
               <div className='row clearfix'>
                    <div className='col-12 col-lg-6 col-xl'>
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
                    {/* <div className='up-arrow'>
                         <i className="fas fa-arrow-up"></i>

                         </div> */}
                    {/* <i class="fas fa-arrow-down down-arrow"></i> */}

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
                         {/* <div className='number count-to'>{props.data[8]}</div> */}
                         <div className='number count-to'>{TotaltoDate[4]}
                        
                         (<i className="fas fa-arrow-up up-arrow"></i>{NewinLast[4]})
                         </div>

                    </div>
                    {/* <div className='up-arrow'>
                         <i className="fas fa-arrow-up"></i>

                         </div> */}
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
                         {/* <div className='number count-to'>{props.data[6]}</div> */}
                         <div className='number count-to'>{TotaltoDate[3]}
                        ({NewinLast[3] > 0 &&  <i className="fas fa-arrow-up up-arrow">{NewinLast[3]}</i>
                          || NewinLast[3]<= 0 &&  <i className="fas fa-arrow-down down-arrow">{NewinLast[3]}</i>})
                        
                         </div>

                    </div>
                    {/* <div className='up-arrow'>
                         <i className="fas fa-arrow-up"></i>

                         </div> */}
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
                         {/* <div className='number count-to'>{props.data[10]}</div> */}
                         <div className='number count-to'>{TotaltoDate[5]}
                             ({NewinLast[5] > 0 && <i className="fas fa-arrow-up up-arrow">{NewinLast[5]}</i>
                              || NewinLast[5] <= 0 && <i className="fas fa-arrow-down up-down">{NewinLast[5]}</i>})
                         
                         </div>

                    </div>
                    {/* <div className='up-arrow'>
                         <i className="fas fa-arrow-up"></i>

                    </div> */}
                    </div>
                    </div>
                    
               </div>
          </div>
          {/* <Graph/>                   */}
          </section>
          
           
         </div>
        
    )
}

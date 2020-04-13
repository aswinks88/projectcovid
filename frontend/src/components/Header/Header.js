import React, {useState,useEffect} from 'react'
import './Header.css'
import Graph from '../Graph/Graph'

export default function Header(props) {
     // const {Data, useData} = useState()
     // useData(props.data)
     // useEffect(() => {
     //      console.log(Data)
     // })
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
         <nav className='navbar' style={{backgroundColor: 'red', color: 'white'}}>
               <div className='container-fluid'>
                    <div className='navbar-header'>
                         <h2>Covid-19 Tracker</h2>
                    </div>
               </div>
          </nav>
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
                              (<i className="fas fa-arrow-up up-arrow"></i>{NewinLast[2]})</div>
                         {/* <div className='number count-to'>{TotaltoDate[2]}</div> */}
                         

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
                         (<i className="fas fa-arrow-up up-arrow"></i>{NewinLast[3]})
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
                         (<i className="fas fa-arrow-up up-arrow"></i>{NewinLast[5]})
                         </div>

                    </div>
                    {/* <div className='up-arrow'>
                         <i className="fas fa-arrow-up"></i>

                    </div> */}
                    </div>
                    </div>
                    
               </div>
          </div>
          <Graph/>                  
          </section>
          
           
         </div>
        
    )
}

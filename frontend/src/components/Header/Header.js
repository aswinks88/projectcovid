import React from 'react'
import './Header.css'
import Graph from '../Graph/Graph'
export default function Header(props) {
    return (
         <div>
         <nav className='navbar' style={{backgroundColor: 'red', color: 'white'}}>
               <div className='container-fluid'>
                    <div className='navbar-header'>
                         <h4 className='navbar-brand'>Covid-19 Tracker</h4>
                    </div>
               </div>
          </nav>
          <section className='content'>
          <div className='container-fluid'>
               <div className='block-header'>
                    <h2>Summary</h2>
               </div>
               <div className='row clearfix'>
                    <div className='col-12 col-lg-6 col-xl'>
                    <div className='bg-info info-box'>
                    <div className='icon'>
                    <i className="fas fa-virus"></i>

                    </div>
                    <div className='content'>
                         <div className='text'>
                         Total Cases
                         </div>
                         <div className='number count-to'>{props.data[4]}</div>
                         {/* <div className='number count-to'>950</div> */}
                         

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
                         Total Recovered
                         </div>
                         <div className='number count-to'>{props.data[8]}</div>
                         {/* <div className='number count-to'>950</div> */}

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
                         <div className='number count-to'>{props.data[10]}</div>
                         {/* <div className='number count-to'>950</div> */}

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
                         <div className='number count-to'>{props.data[6]}</div>
                         {/* <div className='number count-to'>950</div> */}

                    </div>
                    {/* <div className='up-arrow'>
                         <i className="fas fa-arrow-up"></i>

                         </div> */}
                    </div>
                    </div>
               </div>
          </div>
          <Graph />

          </section>
          
           
         </div>
        
    )
}

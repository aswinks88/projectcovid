import React from 'react'
import './Header.css'
export default function Header(props) {
    return (
         <section>
         <nav className='navbar' style={{backgroundColor: 'red', color: 'white'}}>
               <div className='container-fluid'>
                    <div className='navbar-header'>
                         <h4 className='navbar-brand'>Covid-19 Tracker</h4>
                    </div>
               </div>
          </nav>
          <div className='container-fluid'>
               <div className='block' style ={{marginBottom: '15px', display: 'block'}}>
                    <h2>Summary</h2>
               </div>
               <div className='row clearfix'>
                    <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12'>
                    <div className='bg-info info-box'>
                    <div className='icon'>
                    <i class="fas fa-virus"></i>
                    </div>
                    <div className='content'>
                         <div className='text'>
                         Total Cases
                         </div>
                         <div className='number count-to'>800</div>
                    </div>
                    </div>
                    </div>
               </div>
          </div>
           
         </section>
        
    )
}
// col-xl-10 col-lg-9 col-md-8 ml-auto bg-dark fixed-top py-2

 {/* <div className='container my-4'> */}
            {/* <header className='App-header navbar'>
              
              </header> */}
               {/* <div className='row'>
                    <div className='col-xl-10 col-lg-9 col-md-8 ml-auto bg-dark fixed-top py-2 top-navbar'>
                         <div className='row align-items-center'>
                              <div>
                                   <h4 className='text-light text-uppercase mb-0'>Covid-19 Tracker</h4>
                              </div>
                         </div>

                    </div>
               </div>
           </div> */}
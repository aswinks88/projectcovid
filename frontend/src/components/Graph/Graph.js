import React from 'react'

export default function Graph() {
    return (
        <div>
            
          <div className='clearfix'>
               <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <div className='card'>
                         <div className='header'>
                              <div className='row clearfix'>
                                   <div className='col-xs-12 col-sm-6'>
                                        <h2>Confirmed cases</h2>
                                   </div>
                              </div>
                         </div>
                         <div className='body'>
                              <div className='dashboard-flot-chart' style={{padding: '0px', position:'relative'}}>
                                   
                              </div>
                              
                         </div>
                    </div>
               </div>
          </div>
        </div>
    )
}

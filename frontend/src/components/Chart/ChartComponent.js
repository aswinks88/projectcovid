import React, {useState, useEffect} from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2'
const ChartComponent = (props) => {

    return (
        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                      <div className='card'>
                           <div className='header'>
                                <div className='row clearfix'>
                                     <div className='col-xs-12 col-sm-6'>
                                          {props.name}
                                     </div>
                                </div>
                           </div>
                           <div className='body'>
                                <div className='chart' style={{display: 'block'}}>
                                <Line
                                      data={props.data}
                                      width={765}
                                      height={275}
                                      options={{ aspectRatio:1, maintainAspectRatio: false, responsive: true }}
                                  />
                                </div>
                                
                           </div>
                      </div>
                 </div>
    )
}

export default ChartComponent
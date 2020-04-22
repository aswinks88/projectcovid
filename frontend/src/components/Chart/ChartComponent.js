import React from 'react'
import {Bar, Line, HorizontalBar, Pie} from 'react-chartjs-2'
import './Graph.css'
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
                                {props.chartType === 'line' && 
                                <Line
                                      data={props.data}
                                      width={765}
                                      height={300}
                                      options={{ aspectRatio:1, maintainAspectRatio: false, responsive: true, }}
                                  /> ||
                                  props.chartType==='hbar' &&
                                  <HorizontalBar
                                      data={props.data}
                                      width={765}
                                      height={300}
                                      options={{ aspectRatio:2, maintainAspectRatio: false, responsive: true, }}
                                  /> || props.chartType==='pie' && 
                                  <Pie 
                                      data={props.data}
                                      width={765}
                                      height={300}
                                      options={{ aspectRatio:2, maintainAspectRatio: false, responsive: true, }}/>}
                                </div>
                                
                           </div>
                      </div>
                 </div>
    )
}

export default ChartComponent
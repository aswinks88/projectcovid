import React from 'react'
import {Bar, Line, HorizontalBar, Pie, Doughnut} from 'react-chartjs-2'
import * as zoom from 'chartjs-plugin-zoom'
import './Graph.css'
const ChartComponent = (props) => {
// console.log(props.data)
    return (
     // col-lg-6 col-md-6 col-sm-12 col-xs-12
     // col-xs-12 col-sm-12 col-md-12 col-lg-12     
                                <div className='chart' style={{display: 'block'}}>
                                {props.chartType === 'line' && 
                                <Line
                                      data={props.data}
                                      width={765}
                                      height={300}
                                      options={{tooltips:{mode:'index'}, 
                                      
                                      aspectRatio:1, maintainAspectRatio: false, responsive: true, }}
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
                                      options={{ aspectRatio:2, maintainAspectRatio: false, responsive: true, }}/> 
                                      || props.chartType==='bar' && 
                                      <Bar
                                      data={props.data}
                                      width={765}
                                      height={300}
                                      options={{ aspectRatio:2, maintainAspectRatio: false, responsive: true, }}
                                  /> || props.chartType==='doughnut' &&  
                                      <Doughnut
                                      data={props.data}
                                      width={765}
                                      height={200}
                                      options={{
                                      legend:{labels:{fontColor: "white"}}, 
                                      cutoutPercentage: 80, 
                                      aspectRatio:2, 
                                      maintainAspectRatio: false, 
                                      responsive: true, }}/> }
                                </div>          
    )
}

export default ChartComponent

// zoom:{enabled: true, mode:'xy', drag: false,rangeMin: {x:0,y:10}, rangeMax: {x:0,y:2000}}, 
// pan:{enabled: true, speed: 10, mode:'xy', rangeMin: {x:0,y:0}, rangeMax: {x:0,y:2300}}, 
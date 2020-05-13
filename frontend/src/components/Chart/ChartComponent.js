import React from 'react'
import {Bar, Line, HorizontalBar, Pie, Doughnut} from 'react-chartjs-2'
import * as zoom from 'chartjs-plugin-zoom'
import './Graph.css'
const ChartComponent = (props) => {
// console.log(props.data)
    return (
     // col-lg-6 col-md-6 col-sm-12 col-xs-12
     // col-xs-12 col-sm-12 col-md-12 col-lg-12     
                                <div className='chart'>
                                {props.chartType === 'line' ? 
                                <Line
                                      data={props.data}
                                      width={765}
                                      height={300}
                                      options={{tooltips:{mode:'index', position:'nearest'},
                                      plugins:{
                                      zoom :{zoom:{enabled: props.zoomStatus, mode:'x',
                                      rangeMin: {x:0,y:0}, 
                                      rangeMax: {x:0,y:1500}}, 
                                      pan:{enabled: props.zoomStatus, speed: 1, mode:'x', 
                                      rangeMin: {x:0,y:0}, rangeMax: {x:0,y:1550}}}}, 
                                      aspectRatio:1, maintainAspectRatio: false}}
                                  /> :
                                  props.chartType==='hbar' ?
                                  <HorizontalBar
                                      data={props.data}
                                      width={765}
                                      height={300}
                                      options={{  plugins:{
                                      zoom :{zoom:{enabled: props.zoomStatus, mode:'y', 
                                      rangeMin: {x:0,y:10}, 
                                      rangeMax: {x:0,y:1500}}, 
                                      pan:{enabled: props.zoomStatus, speed: 1, mode:'y', 
                                      rangeMin: {x:0,y:0}, rangeMax: {x:0,y:1500}}}},
                                      aspectRatio:2, maintainAspectRatio: false}}
                                  /> : props.chartType==='pie' ?
                                  <Pie 
                                      data={props.data}
                                      width={765}
                                      height={340}
                                      options={{ aspectRatio:2, maintainAspectRatio: false, responsive: true, }}/> 
                                      : props.chartType==='bar' ?
                                    <Bar
                                      data={props.data}
                                      width={765}
                                      height={400}
                                      options={{ aspectRatio:2, maintainAspectRatio: false, responsive: true, }}
                                  /> : props.chartType==='doughnut' ?  
                                      <Doughnut
                                      data={props.data}
                                      width={765}
                                      height={200}
                                      options={{
                                      legend:{labels:{fontColor: "white"}}, 
                                      cutoutPercentage: 80, 
                                      aspectRatio:2, 
                                      maintainAspectRatio: false, 
                                      responsive: true, }}/> : <p>Chart failed to load</p>}
                                </div>          
    )
}

export default ChartComponent


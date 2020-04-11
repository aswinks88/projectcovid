import React, { Component } from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2'
import axios from 'axios'
import './Graph.css'
export class Graph extends Component {
    constructor(props){
        super(props)
        // console.log(1,this.props.data)

        this.state = {
            chartData:{}
        }
        // console.log(this.state.chartData)
        
    }
    componentDidMount(){
        axios.get('http://localhost:5000/stats')
        .then(res => {
            let dates = []
            let confirmedCases = []
            for(let i=0; i < res.data.length; i++){
                if(i % 2 === 0){
                    dates.push(res.data[i])
                } else {
                    confirmedCases.push(res.data[i])
                }
            }
                    // console.log(i , res.data[i])
                    this.setState({
                        chartData:{
                            labels: dates,
                            datasets:[
                                {
                                    label: 'Total confirmed cases',
                                    backgroundColor: "rgb(0,139,139)",
                                    borderColor: 'rgb(255,255,255)',
                                    data:confirmedCases
                                }
                            ]
                        }
                    })
            
            // console.log(1 ,this.state.chartData.labels, this.state.chartData.datasets)
            // this.setState({
            //     labels: res.data
            // })
        })
    }
    render() {
        
        return (
             <div>
            {/* <section class='content'></section> */}
            <div className='row clearfix'>
                 <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                      <div className='card'>
                           <div className='header'>
                                <div className='row clearfix'>
                                     <div className='col-xs-12 col-sm-6'>
                                          <h4>Confirmed cases</h4>
                                     </div>
                                </div>
                           </div>
                           <div className='body'>
                                <div className='chart' style={{display: 'block'}}>
                                <Line
                                      data={this.state.chartData}
                                      width={765}
                                      height={275}
                                      options={{ aspectRatio:1, maintainAspectRatio: false, responsive: true }}
                                  />
                                </div>
                                
                           </div>
                      </div>
                 </div>
                 <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                      <div className='card'>
                           <div className='header'>
                                <div className='row clearfix'>
                                     <div className='col-xs-12 col-sm-6'>
                                          <h4>Confirmed cases</h4>
                                     </div>
                                </div>
                           </div>
                           <div className='body'>
                                <div className='chart' style={{display: 'block'}}>
                                <Bar
                                      data={this.state.chartData}
                                      width={765}
                                      height={275}
                                      options={{ aspectRatio:1, maintainAspectRatio: false, responsive: true }}
                                  />
                                </div>
                                
                           </div>
                      </div>
                 </div>
                 
            </div>
          </div>
        )
    }
}

export default Graph

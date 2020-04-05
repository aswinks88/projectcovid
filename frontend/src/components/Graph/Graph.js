import React, { Component } from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2'
import axios from 'axios'
export class Graph extends Component {
    constructor(props){
        super(props)
        console.log(1,this.props.data)

        this.state = {
            chartData:{
                labels: ['up1', 'up2'],
                datasets:[
                    {
                        label: 'cases',
                        data:[
                            265,
                            500,
                            600,
                            700,
                            800,
                            900
                        ]
                    }
                ]
            }
        }
        // console.log(this.state.chartData)
        
    }
    componentDidMount(){
        axios.get('http://localhost:5000/stats')
        .then(res => {
            console.log(1 , res.data)
        })
    }
    render() {
        
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
                                <div className='chart' style={{padding: '0px', position:'relative'}}>
                                <Bar
                                      data={this.state.chartData}
                                      width={100}
                                      height={50}
                                      options={{ maintainAspectRatio: false }}
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

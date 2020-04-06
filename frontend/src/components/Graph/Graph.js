import React, { Component } from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2'
import axios from 'axios'
import './Graph.css'
export class Graph extends Component {
    constructor(props){
        super(props)
        console.log(1,this.props.data)

        this.state = {
            chartData:{},
            data:{
                labels:['1','2','3','4','5','6'],
                datasets: [
                    {
                        label: 'test graph',
                        backgroundColor: "rgba(255,0,255,0.75)",
                        data: [4,5,1,10,32,2,12]
                    },{
                        label: 'Subscription',
                        backgroundColor: "rgba(0,255,0,0.75)",
                        data: [4,15,11,15,42,12,22]
                    }
                ]
            }
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
                                    borderColor: 'rgb(255, 99, 132)',
                                    data:confirmedCases
                                }
                            ]
                        }
                    })
            
            console.log(1 ,this.state.chartData.labels, this.state.chartData.datasets)
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

import React, { Component } from 'react'
import axios from 'axios'
import ChartComponent from '../Chart/ChartComponent'
import './Graph.css'
export class Chart extends Component {
    constructor(props){
        super(props)

        this.state = {
            chartData:{},
            dailyCases: {}
        }      
    }
    componentDidMount(){
        axios.get('http://localhost:5000/stats')
        .then(res => {
            let dates = []
            let confirmedCases = []
            const dailyCases = []
            for(let i=0; i < res.data.length; i++){
                if(i % 2 === 0){
                    dates.push(res.data[i])
                } else {
                    confirmedCases.push(res.data[i])
                }
            }
            for(let i=0; i< confirmedCases.length; i++){
                dailyCases.push(confirmedCases[i+1] - confirmedCases[i])
                // console.log(confirmedCases[i+1] , confirmedCases[i])
            }
            // console.log(dailyCases)
                    // console.log(i , res.data[i])
                    this.setState({
                        chartData:{
                            labels: dates,
                            datasets:[
                                {
                                    label: 'Total confirmed cases of COVID-19',
                                    backgroundColor: "rgb(0,139,139)",
                                    borderColor: 'rgb(255,255,255)',
                                    data:confirmedCases
                                }
                            ]
                        }
                    })
                    this.setState({
                        dailyCases:{
                            labels: dates,
                            datasets:[
                                {
                                    label: 'Daily confirmed cases of COVID-19',
                                    backgroundColor: "rgb(0,139,139)",
                                    borderColor: 'rgb(255,255,255)',
                                    data:dailyCases
                                }
                            ]
                        }
                    })
            
        })
    }
    render() {
        return (
             <div>
            <div className='row clearfix'>
            <ChartComponent name={<h4>Total Confirmed Cases</h4>} data = {this.state.chartData}/>
            <ChartComponent name={<h4>Daily cases</h4>} data = {this.state.dailyCases}/>               
            </div>
          </div>
        )
    }
}

export default Chart

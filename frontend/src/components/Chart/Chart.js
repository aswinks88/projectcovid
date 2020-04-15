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
        this.confirmedCasesHandler = this.confirmedCasesHandler.bind(this)
        this.deathandrecoveryRateHandler = this.deathandrecoveryRateHandler.bind(this)
    }
    componentDidMount(){
     
      this.confirmedCasesHandler()
      this.deathandrecoveryRateHandler()
            
    }
    confirmedCasesHandler(){
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
    })
    }
    deathandrecoveryRateHandler(){
        axios.get('http://localhost:5000/recovery')
        .then(res =>{
            const dates = []
            const recoveryCases = []
            const deathRate = []
            console.log(res.data.totalRecoverydata.length)
            for(let i = 0; i< res.data.totalRecoverydata.length;i++){
                if(i % 2 === 0 ){
                    dates.push(res.data.totalRecoverydata[i])
                } else {
                    recoveryCases.push(res.data.totalRecoverydata[i])
                }
            }
            for(let i = 0; i < res.data.totalDeathRate.length; i++){
                deathRate.push(res.data.totalDeathRate[i])
            }
                    this.setState({
            dailyCases:{
                labels: dates,
                datasets:[
                    {
                        label: 'Recovery rate of COVID-19 cases',
                        backgroundColor: "green",
                        borderColor: 'rgb(255,255,255)',
                        data:recoveryCases
                    },
                    {
                        label: 'Death rate of COVID-19 cases',
                        backgroundColor: "red",
                        borderColor: 'rgb(255,255,255)',
                        data:deathRate
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
            <ChartComponent name={<h4>Recovery rate vs Death rate</h4>} data = {this.state.dailyCases}/>               
            </div>
          </div>
        )
    }
}

export default Chart


// const dailyCases = []
// for(let i=0; i< confirmedCases.length; i++){
//     dailyCases.push(confirmedCases[i+1] - confirmedCases[i])
// }

       
//         this.setState({
//             dailyCases:{
//                 labels: dates,
//                 datasets:[
//                     {
//                         label: 'Daily confirmed cases of COVID-19',
//                         backgroundColor: "rgb(0,139,139)",
//                         borderColor: 'rgb(255,255,255)',
//                         data:dailyCases
//                     }
//                 ]
//             }
//         })
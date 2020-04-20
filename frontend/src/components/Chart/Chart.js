import React, { Component } from 'react'
import axios from 'axios'
import ChartComponent from '../Chart/ChartComponent'
import './Graph.css'
export class Chart extends Component {
    constructor(props){
        super(props)

        this.state = {
            chartData:{},
            dailyCases: {},
            dhb:{}
        }      
        this.confirmedCasesHandler = this.confirmedCasesHandler.bind(this)
        this.deathandrecoveryRateHandler = this.deathandrecoveryRateHandler.bind(this)
        this.dhbHandler = this.dhbHandler.bind(this)
    }
   async componentDidMount(){
     
      await this.confirmedCasesHandler()
      await this.deathandrecoveryRateHandler()
      await this.dhbHandler()
            
    }
    async confirmedCasesHandler(){
        await axios.get('http://localhost:5000/stats')
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
   async deathandrecoveryRateHandler(){
        await axios.get('http://localhost:5000/recovery')
        .then(res =>{
            const dates = []
            const recoveryCases = []
            const deathRate = []
            // console.log(res.data.totalRecoverydata)
            for(let i = 0; i< res.data.totalRecoverydata.length;i++){
                if(i % 2 === 0 ){
                    dates.push(res.data.totalRecoverydata[i])
                } else {
                    recoveryCases.push(res.data.totalRecoverydata[i])
                }
            }
            console.log(recoveryCases)
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
    async dhbHandler(){
        await axios.get('http://localhost:5000/dhbdata')
        .then(res => {
            // console.log(1, res.data)
            const place = []
            const cases = []
            const deseased = []
            const recovered = []
            const active = []
            for(let i = 0 ; i < res.data.length - 1; i++)
            {
                place.push(res.data[i].Place)
                cases.push(res.data[i].total)
                deseased.push(res.data[i].deceased)
                recovered.push(res.data[i].recovered)
                active.push(res.data[i].cases)
            }
            console.log( cases)
            this.setState({
               dhb: {
                labels: place,
                datasets:[
                
                {
                    stack: 'stack1',
                    label: 'Total cases',
                    backgroundColor: "blue",
                    
                    fillOpacity: 0,
                    borderColor: 'rgb(255,255,255)',
                    data: cases
            },
            {
                stack: 'stack1',
                label: 'Total recovered',
              
                backgroundColor: "green",
                borderColor: 'rgb(255,255,255)',
                data: recovered
        },
        {
            stack: 'stack1',
            label: 'Active Cases',
           
            backgroundColor: 'rgb(222,207,0)',
            borderColor: 'rgb(255,255,255)',
            data: active
    },
        {
            stack: 'stack1',
            label: 'Total Death',
            
            backgroundColor: "red",
            borderColor: 'rgb(255,255,255)',
            data: deseased
        }
        
                ],
                options: {
                    scales: {
                        yAxes:[{stacked: true}]
                    }
                }
                
            }
            })
        })
    }
    render() {
        return (
             <div>
            <div className='row clearfix'>
            <ChartComponent name={<h4>Total Confirmed Cases</h4>} data = {this.state.chartData} chartType='line'/>
            <ChartComponent name={<h4>Recovery rate vs Death rate</h4>} data = {this.state.dailyCases} chartType='line'/>    
            <ChartComponent name={<h4>Cases by DHB</h4>} data = {this.state.dhb} chartType='hbar'/>               
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

 

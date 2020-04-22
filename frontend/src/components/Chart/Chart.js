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
            dhb:{},
            gender: {}
        }      
        this.confirmedCasesHandler = this.confirmedCasesHandler.bind(this)
        this.deathandrecoveryRateHandler = this.deathandrecoveryRateHandler.bind(this)
        this.dhbHandler = this.dhbHandler.bind(this)
        this.confirmedAndProbableCaseHandler = this.confirmedAndProbableCaseHandler.bind(this)
    }
   async componentDidMount(){
     
      await this.confirmedCasesHandler()
      await this.deathandrecoveryRateHandler()
      await this.dhbHandler()
      await this.confirmedAndProbableCaseHandler()
            
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
                        // backgroundColor: "rgb(0,139,139)",
                        // borderColor: 'rgb(255,255,255)',
                        backgroundColor: "rgb(0,139,139)",
                        borderColor: "rgb(0,139,139)",
                        borderWidth: 1,
                        fill: false,
                        lineTension: 0 ,
                        data:confirmedCases
                    }
                ]
            }
        })
    }).catch(err => {
        console.log(err)
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
                        borderColor: "green",
                        borderWidth: 1,
                        fill: false,
                        lineTension: 0 ,
                        data:recoveryCases
                    },
                    {
                        label: 'Death rate of COVID-19 cases',
                        backgroundColor: "red",
                        borderColor: "red",
                        borderWidth: 1,
                        fill: false,
                        lineTension: 0 ,
                        data:deathRate
                    }
                ]
            }
        })
        }).catch(err => {
            console.log(err)
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
        
                ]
            }
            })
        }).catch(err => {
            console.log(err)
        })
    }
    async confirmedAndProbableCaseHandler(){
        await axios.get('http://localhost:5000/')
        .then(res => {
            // console.log(res.data.parsedData.Confirmed[0].Sex)
            const male = []
            const female = []
            const others =[]
            const gender=[]
            
            for(let i = 0; i<res.data.parsedData.Confirmed.length; i++){
                // console.log(res.data.parsedData.Probable[0].Sex)
                if(res.data.parsedData.Confirmed[i].Sex === 'Male'){
                    male.push(res.data.parsedData.Confirmed[i].Sex)
                } else if(res.data.parsedData.Confirmed[i].Sex === 'Female'){
                    female.push(res.data.parsedData.Confirmed[i].Sex)
                } else {
                    others.push(res.data.parsedData.Confirmed[i].Sex)
                }
            }
            for(let i=0; i<res.data.parsedData.Probable.length; i++){
                if(res.data.parsedData.Probable[i].Sex === 'Male'){
                    male.push(res.data.parsedData.Probable[i].Sex)
                } else if(res.data.parsedData.Probable[i].Sex === 'Female'){
                    female.push(res.data.parsedData.Probable[i].Sex)
                } else {
                    others.push(res.data.parsedData.Probable[i].Sex)
                }
            }
           
            this.setState({
                gender: {
                    labels: ['Male', 'Female','others'],
                    datasets: [{
                        backgroundColor: ['#ff6f69','#ffcc5c', '#88d8b0'],
                        data: [male.length, female.length, others.length]
                    }]
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
            <ChartComponent name={<h4>Gender</h4>} data = {this.state.gender} chartType='pie'/>               

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

 

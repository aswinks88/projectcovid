import React, { Component } from 'react'
import axios from 'axios'
import ChartComponent from './ChartComponent'
import './Graph.css'
import Spinner from 'react-bootstrap/Spinner'

export class Charts extends Component {
    constructor(props){
        super(props)

        this.state = {
            chartData:{},
            dailyCases: {},
            dhb:{},
            gender: {},
            genderRatio: {},
            ageGroupData:{},
            loading: false,
            zoomEnabledLC1: false,
            zoomEnabledLC2: false,
            zoomEnabledHB1:false,
            zoomEnabledHB2:false
        }      
        this.confirmedCasesHandler = this.confirmedCasesHandler.bind(this)
        this.deathandrecoveryRateHandler = this.deathandrecoveryRateHandler.bind(this)
        this.dhbHandler = this.dhbHandler.bind(this)
        this.totalConfirmedCaseGenderHandler = this.totalConfirmedCaseGenderHandler.bind(this)
        this.zoomEnableHandlerLC1 = this.zoomEnableHandlerLC1.bind(this)
        this.zoomEnableHandlerLC2 = this.zoomEnableHandlerLC2.bind(this)
        this.zoomEnableHandlerHB1 = this.zoomEnableHandlerHB1.bind(this)
        this.zoomEnableHandlerHB2 = this.zoomEnableHandlerHB2.bind(this)
    }
   async componentDidMount(){
     
      await this.confirmedCasesHandler()
      await this.deathandrecoveryRateHandler()
      await this.dhbHandler()
      await this.totalConfirmedCaseGenderHandler()
            
    }
    async confirmedCasesHandler(){
        await axios.get('https://www.nzcovid19.site/api/stats')
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
                        backgroundColor: "#3bbdbd",
                        borderColor: "#3bbdbd",
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
        await axios.get('https://www.nzcovid19.site/api/recovery')
        .then(res =>{
            const dates = []
            const recoveryCases = []
            const deathRate = []
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
                        backgroundColor: "#80a71a",
                        borderColor: "#80a71a",
                        borderWidth: 1,
                        fill: false,
                        lineTension: 0 ,
                        data:recoveryCases
                    },
                    {
                        label: 'Death rate of COVID-19 cases',
                        backgroundColor: "	#e8615d",
                        borderColor: "#e8615d",
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
        await axios.get('https://www.nzcovid19.site/api/dhbdata')
        .then(res => {
            const place = []
            const cases = []
            const deceased = []
            const recovered = []
            const active = []
            for(let i = 0 ; i < res.data.length - 1; i++)
            {
                place.push(res.data[i].Place)
                cases.push(res.data[i].total)
                deceased.push(res.data[i].deceased)
                recovered.push(res.data[i].recovered)
                active.push(res.data[i].cases)
            }
            this.setState({
               dhb: {
                labels: place,
                datasets:[
                
                {
                    stack: 'stack1',
                    label: 'Total cases',
                    backgroundColor: "#2d9de5",
                    
                    fillOpacity: 0,
                    borderColor: '#2d9de5',
                    data: cases
            },
            {
                stack: 'stack1',
                label: 'Total recovered',
              
                backgroundColor: "#3bbdbd",
                borderColor: '#3bbdbd',
                data: recovered
        },
        {
            stack: 'stack1',
            label: 'Active Cases',
           
            backgroundColor: '#FFA318',
            borderColor: '#FFA318',
            data: active
    },
        {
            stack: 'stack1',
            label: 'Total Death',
            
            backgroundColor: "#FF1F24",
            borderColor: '#FF1F24',
            data: deceased
        }
        
                ]
            }
            })
        }).catch(err => {
            console.log(err)
        })
    }
    async totalConfirmedCaseGenderHandler(){
        await axios.get('https://www.nzcovid19.site/api/agegroup-gender-affected')
        .then(async res => {
            const male =[]
            const female =[]
            const others = []
            const total = res.data.filterByAge.length
            const ageGroup = res.data.result.sort((a,b) => { return a.split(' ')[0]-b.split(' ')[0]})
            const genderAge1to4m = []
            const genderAge1to4f = []
            const genderAgeUnknown = []
            await res.data.filterByAge.forEach((data, index) => {
                if(data.gender === 'Male'){
                   male.push(data.gender[index])
                } else if(data.gender === 'Female'){
                    female.push(data.gender[index])
                } else {
                    others.push(data.gender[index])
                }
            })
            
           for(let i =0; i<res.data.result.length; i++){
               var Malecounter = 0
               var Femalecounter = 0
               var unknown = 0
               for(let j=0; j<res.data.filterByAge.length; j++){
                   if(res.data.result[i] === res.data.filterByAge[j].ageGroup){
                       if(res.data.filterByAge[j].gender === 'Male'){ 
                       Malecounter += 1
                       } else if(res.data.filterByAge[j].gender === 'Female'){
                       Femalecounter += 1
                       } else {
                       unknown += 1
                       } 
                   }
               }
            genderAge1to4m.push(Malecounter)
            genderAge1to4f.push(Femalecounter)
            genderAgeUnknown.push(unknown)
           }
            this.setState({
                    genderRatio: {
                        male: ((male.length/total)*100).toFixed(2),
                        female: ((female.length/total)*100).toFixed(2),
                        others: ((others.length/total)*100).toFixed(2)
                    }
                })
            this.setState({
                gender: {
                    labels: [`Male(${this.state.genderRatio.male}%) `,` Female(${this.state.genderRatio.female}%)`,`Others(${this.state.genderRatio.others}%)`],
                    datasets: [{
                        backgroundColor: ['#ff6f69','#ffcc5c', '#88d8b0'],
                        data: [male.length, female.length, others.length]
                    }]
                }
            })
            this.setState({
                ageGroupData: {
                    labels: ageGroup,
                    datasets: [{
                        stack: 'stack1',
                        label: 'Female',
                        backgroundColor: "#236e95",
                        borderColor: '#236e95',
                        data: genderAge1to4f
                    },
                        {
                        stack: 'stack1',
                        label: 'Male',                       
                        backgroundColor: "#15b2d1",
                        borderColor: '#15b2d1',
                        data:genderAge1to4m
                    },
                    
                    {
                        stack: 'stack1',
                        label: 'Others',
                        backgroundColor: "#74c9c1",
                        borderColor: '#74c9c1',
                        data: genderAgeUnknown
                    }
                    ]
                }
            })
          
        }).then(()=>{
            new Promise (wait => setTimeout(wait, 2000))
            this.setState({
                loading: true
            })
        }
          )
    }
    zoomEnableHandlerLC1(e){
        if(e === false){
            this.setState({
                zoomEnabledLC1: true,
            })
        } else {
            this.setState({
                zoomEnabledLC1: false,
            })
        }
    }
    zoomEnableHandlerLC2(e){
        if(e === false){
            this.setState({
                zoomEnabledLC2: true,
            })
        } else {
            this.setState({
                zoomEnabledLC2: false,
            })
        }
    }
    zoomEnableHandlerHB1(e){
        if(e === false){
            this.setState({
                zoomEnabledHB1: true,
            })
        } else {
            this.setState({
                zoomEnabledHB1: false,
            })
        }
    }
    zoomEnableHandlerHB2(e){
        if(e === false){
            this.setState({
                zoomEnabledHB2: true,
            })
        } else {
            this.setState({
                zoomEnabledHB2: false,
            })
        }
        
    }
    render() {
        return (
            <div className='container-fluid'>
            <h5>Recent Trends</h5>
            {!this.state.loading ? <span className='text-center'>Loading chart data...<Spinner className='spinner text-secondary' animation="border" variant="primary" /></span>
                :<div className='row clearfix'> 
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 '>
            
                    <div className='card'>
                           <div className='header'>
                                <div className='row clearfix'>
                                     <div className='col-lg-6 col-md-12 col-sm-6'>
                                         <h4> Total Confirmed Cases</h4>
                                     </div>
                                </div>
                           </div>
                 <div className='body'>
                      <ChartComponent className='linechart' data = {this.state.chartData} chartType='line' zoomStatus={this.state.zoomEnabledLC1}/>
                      {!this.state.zoomEnabledLC1 ? <button className='zoombutton bg-red waves-effect' 
                      onClick={() => this.zoomEnableHandlerLC1(this.state.zoomEnabledLC1)}>
                      Enable pan/zoom
                      </button>:<button className='zoombutton bg-red waves-effect' 
                      onClick={() => this.zoomEnableHandlerLC1(this.state.zoomEnabledLC1)}>
                      Disable pan/zoom
                      </button>}
                 </div>
                    </div>
                      
                 </div>
                 
                 <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12  '>          
                    <div className='card'>
                           <div className='header'>
                                <div className='row clearfix'>
                                     <div className='col-lg-6 col-md-12 col-sm-6'>
                                         <h4> Recovery vs Death rate</h4>
                                     </div>
                                </div>
                           </div>
                 <div className='body'>
                 <ChartComponent data = {this.state.dailyCases} chartType='line' zoomStatus={this.state.zoomEnabledLC2}/>    
                { !this.state.zoomEnabledLC2 ? <button className='zoombutton bg-red waves-effect' 
                 onClick={() => this.zoomEnableHandlerLC2(this.state.zoomEnabledLC2)}>
                 Enable pan/zoom
                 </button> : <button className='zoombutton bg-red waves-effect' 
                 onClick={() => this.zoomEnableHandlerLC2(this.state.zoomEnabledLC2)}>
                 Disable pan/zoom
                 </button>}
                 </div>
                </div>
                 </div>
                
                 <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12  '>
                    <div className='card'>
                           <div className='header'>
                                <div className='row clearfix'>
                                     <div className='col-lg-6 col-md-12 col-sm-6'>
                                         <h4> Cases by DHB</h4>
                                     </div>
                                </div>
                           </div>
                 <div className='body'>
                 <ChartComponent data = {this.state.dhb} chartType='hbar' zoomStatus={this.state.zoomEnabledHB1}/>
                 { !this.state.zoomEnabledHB1 ? <button className='zoombutton bg-red waves-effect' 
                 onClick={() => this.zoomEnableHandlerHB1(this.state.zoomEnabledHB1)}>
                 Enable pan/zoom
                 </button> : <button className='zoombutton bg-red waves-effect' 
                 onClick={() => this.zoomEnableHandlerHB1(this.state.zoomEnabledHB1)}>
                 Disable pan/zoom
                 </button>}
                 </div>
                </div>
                 </div>
                
                 <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            
                    <div className='card'>
                           <div className='header'>
                                <div className='row clearfix'>
                                     <div className='col-lg-6 col-md-12 col-sm-6'>
                                         <h4> Age group affected</h4>
                                     </div>
                                </div>
                           </div>
                 <div className='body'>
                 <ChartComponent data = {this.state.ageGroupData} chartType='hbar'  zoomStatus={this.state.zoomEnabledHB2}/>
                 { !this.state.zoomEnabledHB2 ? <button className='zoombutton bg-red waves-effect' 
                 onClick={() => this.zoomEnableHandlerHB2(this.state.zoomEnabledHB2)}>
                 Enable pan/zoom
                 </button> : <button className='zoombutton bg-red waves-effect' 
                 onClick={() => this.zoomEnableHandlerHB2(this.state.zoomEnabledHB2)}>
                 Disable pan/zoom
                 </button>}
                 </div>
                </div>
                 </div>
                 
                 <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            
                    <div className='card'>
                           <div className='header'>
                                <div className='row clearfix'>
                                     <div className='col-lg-6 col-md-12 col-sm-6'>
                                         <h4> Gender</h4>
                                     </div>
                                </div>
                           </div>
                 <div className='body'>
                 <ChartComponent data = {this.state.gender} chartType='pie'/>     
                 </div>
                </div>
                 </div>            
            </div>}
          </div>
        )
    }
}

export default Charts

            

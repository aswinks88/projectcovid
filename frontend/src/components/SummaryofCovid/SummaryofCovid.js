import React, { Component } from 'react'
import axios from 'axios'
import Summary from '../Summary/Summary'

export default class SummaryofCovid extends Component {
    constructor(props){
        super(props)
            this.state = {
               data: [],
               doughNutData: {},
               deathRate: '',
               recoveryRate: ''
            }
        this.covidDataHandler = this.covidDataHandler.bind(this)
    }
    async componentDidMount(){
       await this.covidDataHandler()
        

}

async covidDataHandler(){
    await axios.get('http://localhost:5000/')
    .then(res => {
        var recovery =(res.data[4].TotaltoDate).replace(/,/g,'')
        var totaCases = (res.data[2].TotaltoDate).replace(/,/g,'')
        var death = (res.data[5].TotaltoDate).replace(/,/g,'')
        var activeCases = (totaCases - recovery) - death
        var activeRate = ((activeCases/totaCases) * 100).toFixed(2)
        var RateofRecovery = ((recovery/totaCases)*100).toFixed(2)
        var RateofDeath = ((death/totaCases)*100).toFixed(2)
        const stats = res.data
        this.setState({
        data: stats,
        doughNutData: {
            labels: [`Recovery Rate`, `Active Cases`],
                    datasets: [{
                        backgroundColor: ['#F38D29  ','#F47789'],
                        data: [RateofRecovery, activeRate]
                    }]
        },
        deathRate: RateofDeath,
        recoveryRate: RateofRecovery
       })
    
}).catch(err => console.log(err))
}
    render() {
        return (
       <div>
            <Summary data={this.state.data} death={this.state.deathRate} 
            recovery = {this.state.recoveryRate} 
           />
           
       </div>
        )
    }
}

import React, { Component } from 'react'
import {Card, CardDeck} from 'react-bootstrap'
import axios from 'axios'
import Header from '../Header/Header'

export default class SummaryofCovid extends Component {
    constructor(props){
        super(props)
            this.state = {
               data: []
            }
        this.covidDataHandler = this.covidDataHandler.bind(this)
    }
    async componentDidMount(){
       await this.covidDataHandler()
        

}

async covidDataHandler(){
    await axios.get('http://localhost:5000/')
    .then(res => {
       
        const stats = res.data.summary
        this.setState({
        data: stats
    })
    
}).catch(err => console.log(err))
}
    render() {
        return (
       <div>
            <Header data={this.state.data} />
           
       </div>
        )
    }
}

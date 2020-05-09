import React, { Component } from 'react'
import axios from 'axios'
import './Global.css'
export class CovidGlobalData extends Component {
    constructor(props){
        super(props)
        this.state = {
            globalCases: '',
            globalDeath: '',
            globalRecovered: ''
        }
        this.globalCovidCases = this.globalCovidCases.bind(this)
    }
    componentDidMount(){
        this.globalCovidCases()
    }
    globalCovidCases = () =>{
        axios.get('https://covid19.mathdro.id/api')
        .then(res => {
            this.setState({
                globalCases: res.data.confirmed.value,
                globalDeath: res.data.deaths.value,
                globalRecovered: res.data.recovered.value
            })
            return console.log(res.data.confirmed.value)
        })
}
    render() {
        return (
           
           
                    <div className = 'col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                        <div className='card rotw'>
                            <div className='body bg-orange'>
                            <div className='font-weight-bold'>Rest of the World</div>
                            <ul className='stat-list'>
                                   <li>
                                   <i className="fas fa-virus"> </i> &nbsp;
                                   TOTAL
                                       <span className='fa-pull-right'> 
                                       <b>{this.state.globalCases} </b>
                                       </span>        
                                   </li>
                                   <li>
                                   <i className="fas fa-house-user"></i> &nbsp;
                                  RECOVERED
                                       <span className='fa-pull-right'> 
                                       <b>{this.state.globalRecovered} </b>
                                       </span>        
                                   </li>
                                   <li>
                                   <i className="fas fa-head-side-virus"></i> &nbsp;
                                  DEATH
                                       <span className='fa-pull-right'> 
                                       <b>{this.state.globalDeath} </b>
                                       </span>        
                                   </li>
                            </ul>
                            </div>
                        </div>
                    </div>
               
        )
    }
}

export default CovidGlobalData
 {/* <div>
                    {this.state.globalCases}
                    </div>
                   <div>{this.state.globalDeath}</div> 
                   <div>{this.state.globalRecovered}</div> */}
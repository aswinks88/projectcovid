import React, { Component } from 'react'
import {Card, CardDeck} from 'react-bootstrap'
import axios from 'axios'
export default class SummaryofCovid extends Component {
    constructor(props){
        super(props)
            this.state = {
               data: []
            }
        
    }
    componentDidMount(){
        
        axios.get('http://localhost:5000/')
        .then(res => {
            const stats = res.data
            console.log(stats)
            this.setState({
            data: stats
        })
    }).catch(err => console.log(err))

}
    render() {
        return (
       <div></div>
        )
    }
}

 {/* <div>
            <div className="row">
     
     <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 mb-4">
          <div className="card">
               <div className="card-block">
                    <div className="clearfix">
                         <i className="fa fa-user-o float-right icon-grey-big"></i>
                    </div>
                    <h4 className="card-title font-weight-bold text-secondary">{this.state.data[4]}</h4>
                    <p className="card-text">Confirmed cases in New Zealand</p>
                    <div className="progress">
                         <div className="progress-bar progress-bar-striped bg-secondary" role="progressbar" style={{height:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%
                         </div>
                    </div>
               </div>
         </div>
    </div>
   
    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 mb-4">
         <div className="card">
              <div className="card-block">
                   <div className="clearfix">
                        <i className="fa fa-shopping-cart float-right icon-grey-big"></i>
                   </div>
                   <h4 className="card-title font-weight-normal font-weight-bold text-success">{this.state.data[8]}</h4>
                   <p className="card-text ">Number of recovered</p>
                   <div className="progress">
                        <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{height:'40%'}} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">40%</div>
                        </div>
                   </div>
              </div>
         </div>
    
    
    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 mb-4">
         <div className="card">
              <div className="card-block">
                   <div className="clearfix">
                        <i className="fa fa-bar-chart float-right icon-grey-big"></i>
                   </div>
                   <h4 className="card-title font-weight-normal text-danger">{this.state.data[10]}</h4>
                   <p className="card-text">Number of deaths</p>
                    <div className="progress">
                         <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{height:'65%'}} aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">65%</div>
                    </div>
               </div>
          </div>
     </div>
</div>
<div className="text-center">
               <CardDeck>
               <Card text='white' bg='info'  style={{ width: '22rem' }}>
           <Card.Header > Confirmed cases in New Zealand</Card.Header>

              <Card.Body>
                  <Card.Text>{this.state.data[4]}</Card.Text>
              </Card.Body>
              
               </Card>
               <Card text='white' bg='secondary'  style={{ width: '22rem' }}>
           <Card.Header > Number of recovered cases</Card.Header>

              <Card.Body>
                  <Card.Text>{this.state.data[8]}</Card.Text>
              </Card.Body>
              
               </Card>
               <Card text='white' bg='danger'  style={{ width: '22rem' }}>
           <Card.Header > Number of deaths</Card.Header>

              <Card.Body>
                  <Card.Text>{this.state.data[10]}</Card.Text>
              </Card.Body>
              
               </Card>
               </CardDeck>
          
           </div>         
            </div> */}
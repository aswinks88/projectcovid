import React, { Component } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'
// import {GeoJSON} from 'react-leaflet'
// import statesData from './nz-district'
import statesData from './nz-district-data.json'

export default class Leaflet extends Component {
    constructor(props){
        super(props)
        this.state = {
            dhb : '',
            totalcases: '',
            lasttewntyfourhrs: ''
        }
        this.getColor = this.getColor.bind(this)
        this.mapStyle = this.mapStyle.bind(this)
        this.fetchDHBdata = this.fetchDHBdata.bind(this)
    }
    getColor(d){
        return d > 200  ? '#E31A1C' :
        d > 100  ? '#FC4E2A' :
        d > 50   ? '#FD8D3C' :
        d > 20   ? '#FEB24C' :
        d > 10   ? '#FED976' :
                   '#FFEDA0'
    }
    mapStyle(){
        return {
            fillColor: this.getColor(200),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7

        }
    }
    fetchDHBdata(){
        axios.get('http://localhost:5000')
        .then(res => {
            // let dhb = []
            // let totalcases = []
            // let lasttewntyfourhrs = []
            // for (let i = 12; i< res.data.length ; i++)
            // {
            //     if(i % 3 === 0){
            //         dhb.push(res.data[i])
            //     } 
            // }
            // console.log(res.data)
            res.data.filter((data, i) => {
                if(i >=12){
                    // console.log(data, i)
                    return console.log(data)
                }
            })
            // this.setState({
            //     nzDHBData: res.data
            // })
        })
    }
    componentDidMount(){
        this.fetchDHBdata()
        this.map = L.map('map', {
            center: [-40.9006,174.886],
            zoom: 6,
            zoomControl: false
        })
        // https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png
        // https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
            detectRetina: true,
            maxZoom: 20,
            maxNativeZoom: 17
        }).addTo(this.map)
        L.geoJSON(statesData, {style: this.mapStyle}).addTo(this.map)
    }
   
    render(){
        return (
           
                <div className='container-fluid'>
                    <div className='row clearfix'>
                         <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <div className='card'>
                <div className='header'>
                <h2>DHB</h2>
                </div>
                <div className='body'>
                    <div style={{position: 'sticky', overflow: 'hidden'}}>
                    <div style={{width:'100%', height:'720px'}} id='map'></div>
                    </div>
                   
                </div>
            </div>

            </div>
                    </div>
                </div>
           
           
          
        )
    }
}

// import React, { useState } from 'react';
// import ReactMapGL from 'react-map-gl';

// function Maps() {
//   const [viewport, setViewport] = useState({
//     width: 800,
//     height: 600,
//     latitude: -40.9006,
//     longitude: 174.886,
//     zoom: 4
//   });
// const TOKEN = 'pk.eyJ1IjoiYXN3aW5rczg4IiwiYSI6ImNrOG52YTAwNjB1ZmgzaXFjeXBpazhldTcifQ.050p57eEAwuv0rka7gwEdg'
//   return (
//     <ReactMapGL
//       {...viewport}
//       mapboxApiAccessToken={TOKEN}
//       onViewportChange={setViewport}
//     />
//   );
// }

// export default Maps

import React, { Component } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'
// import {GeoJSON} from 'react-leaflet'
// import statesData from './nz-district'
// import statesData from './nz-district-data.json'
import statesData from './nz1.json'
import './Maps.css'
let geojson
var info = L.control()
const cases_150 = "#E71D36"
const cases_100 = "#2EC4B6"
const cases_50 = "#EFFFE9"
const cases_40 = "#011627"
const cases_15 = "#509923"
const cases_0 = "#3eb80e"
export default class Leaflet extends Component {
    constructor(props){
        super(props)

        this.state={
            name: '',
            cases: '',
            updated: ''

        }
        this.mapStyle = this.mapStyle.bind(this)
        this.getColor = this.getColor.bind(this)
        this.fetchDHBdata = this.fetchDHBdata.bind(this)
        
        this.resetHighlight = this.resetHighlight.bind(this)
        this.zoomToFeature =this.zoomToFeature.bind(this)
        this.highlightFeature = this.highlightFeature.bind(this)
        this.onEachFeature = this.onEachFeature.bind(this)   
    }
    fetchDHBdata(){
        axios.get('http://localhost:5000/dhbdata')
        .then(res => {
            res.data.map(data => {
                // console.log(data)
                return data
            })
            // console.log(res.data)
        })
    }

    getColor(d){
        return d > 150  ?  cases_150:
        d > 100  ?  cases_100 :
        d > 50  ? cases_50 :
        d > 40   ?  cases_40 :
        d > 15   ?  cases_15 :
        cases_0
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
        geojson = L.geoJSON(statesData, {style: this.mapStyle,  onEachFeature: this.onEachFeature}).addTo(this.map)
    }

    mapStyle(feature){
        return {
            fillColor: this.getColor(feature.properties.cases),
            weight: 2,
            opacity: 1,
            color: 'grey',
            dashArray: '3',
            fillOpacity: 0.7

        }
    }
    
   highlightFeature(e) {
        var layer = e.target;
        // console.log(layer.feature.properties)
        this.setState({
            name: layer.feature.properties.NAME,
            cases: layer.feature.properties.cases
        })
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
    
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }

    }
    resetHighlight(e) {
        geojson.resetStyle(e.target);
        this.setState({
            name: ''
        })
    }
    zoomToFeature(e) {
        this.map.fitBounds(e.target.getBounds());
    }
    onEachFeature(feature, layer) {
        layer.on({
            mouseover: this.highlightFeature,
            mouseout: this.resetHighlight,
            click: this.zoomToFeature
        });
    }
  
    render(){
        return (
           
                <div className='container-fluid'>
                    <div className='row clearfix'>
                         <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <div className='card'>
                <div className='header'>
                <h2>Cases by DHB</h2>
                </div>
                <div className='body'>
                    <div style={{position: 'sticky', overflow: 'hidden'}}>
                        {!this.state.name ? (
                            <div className='hover'>Touch or Hover over an area</div>
                        ) : (
                                <div className='info'>
                                <strong>DHB: {this.state.name}</strong>
                                <span>Total Number of Cases: {this.state.cases}</span>
                                </div>)}
                    <div className = 'legend'>
                            <div style={{"--color": cases_150}}>150+</div>
                            <div style={{"--color": cases_100}}>100+</div>
                            <div style={{"--color": cases_50}}>50+</div>
                            <div style={{"--color": cases_40}}>40+</div>
                            <div style={{"--color": cases_15}}>15+</div>
                            <div style={{"--color": cases_0}}>0+</div>
                    </div>
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

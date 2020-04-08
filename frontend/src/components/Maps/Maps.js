import React, { Component } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {chain} from 'stream-chain'
import {parser} from 'stream-json'
import {pick} from 'stream-json/filters/Pick'
import {ignore}  from 'stream-json/filters/Ignore'
import {streamValues} from 'stream-json/streamers/StreamValues'
import fs from 'fs'
import zlib from 'zlib'
// import {GeoJSON} from 'react-leaflet'
// import statesData from './nz-district'
import statesData from './nz-district-data.json'

export default class Leaflet extends Component {
    constructor(props){
        super(props)
        this.getColor = this.getColor.bind(this)
        this.mapStyle = this.mapStyle.bind(this)
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
            fillColor: this.getColor(100),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7

        }
    }
    componentDidMount(){
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

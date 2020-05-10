import React, { Component } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { GestureHandling } from 'leaflet-gesture-handling'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'
import statesData from './nz1.json'
import './Maps.css'
let geojson
let layer 
const cases_150 = "#188977"
const cases_100 = "#56B870"
const cases_50 = "#74C67A"
const cases_40 = "#99D492"
const cases_15 = "#BFE1B0"
const cases_0 = "#DEEDCF"

export default class Leaflet extends Component {
    constructor(props){
        super(props)

        this.state={
            name: '',
            cases: '',
            active: '',
            recovered: '',
            changes: '',
            deceased: ''

        }
        this.mapStyle = this.mapStyle.bind(this)
        this.getColor = this.getColor.bind(this)
        
        this.resetHighlight = this.resetHighlight.bind(this)
        this.zoomToFeature =this.zoomToFeature.bind(this)
        this.highlightFeature = this.highlightFeature.bind(this)
        this.onEachFeature = this.onEachFeature.bind(this)   
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
        // L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling)
        this.map = L.map('map', {
            center: [-40.9006,174.886],
            zoom: 6,
            zoomControl: true,
            scrollWheelZoom: false,
            gestureHandling: true,
            gestureHandlingText:{
                text: {
                    touch: 'Use two fingers to move the map',
                    scroll: 'Use ctrl + scroll to zoom the map'
                }
            },
            dragging: false,
            tap: false
            
        })
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
            detectRetina: true,
            maxZoom: 20,
            tileSize: 512,
            maxNativeZoom: 17,
            zoomOffset: -1,
            attribution: '&copy; <a href = https://koordinates.com/>Koordinates</a> | &copy; <a href=https://www.esri.com/en-us/home>Esri</a> | &copy; <a href=https://www.here.com/> HERE</a>| &copy; <a href=https://www.openstreetmap.org/copyright/> OpenStreetMap</a> contributors | &copy; GIS user community'
        }).addTo(this.map)
        geojson = L.geoJSON(statesData, {style: this.mapStyle,  onEachFeature: this.onEachFeature}).addTo(this.map)
        
        //as this.map.on('click', () => {this.map.scrollWheelZoom.enable()})
        this.map.on('mouseout', () => {this.map.scrollWheelZoom.disable()})
        
        document.addEventListener('keydown', (event) => {
            if(event.which === 17){
            // ctrlPressed  = true
            console.log('yes')
            this.map.scrollWheelZoom.enable()
            }      
        })
        document.addEventListener('keyup', () => {
            // ctrlPressed  = false
            console.log('no')

            this.map.scrollWheelZoom.disable()
        })
       
    }

    mapStyle(feature){
        return {
            fillColor: this.getColor(feature.properties.total),
            weight: 2,
            opacity: 1,
            color: 'grey',
            dashArray: '3',
            fillOpacity: 0.7

        }
    }
    
   highlightFeature(e) {
      
        layer = e.target;
        // console.log(layer.feature.properties)
        this.setState({
            name: layer.feature.properties.NAME,
            active: layer.feature.properties.active,
            recovered: layer.feature.properties.recovered,
            total: layer.feature.properties.total,
            deceased:  layer.feature.properties.deceased,
            changes: layer.feature.properties.changes
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
        this.map.fitBounds(e.target.getBounds())
        // this.map.fireEvent('click', )
        if(layer){
       this.resetHighlight(layer)
        console.log('adsada')
        }
        // console.log(e.target)
         layer = e.target;
        this.setState({
            name: layer.feature.properties.NAME,
            active: layer.feature.properties.active,
            recovered: layer.feature.properties.recovered,
            total: layer.feature.properties.total,
            deceased:  layer.feature.properties.deceased,
            changes: layer.feature.properties.changes
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
        // this.resetHighlight(e)
    }
    onEachFeature(feature, layer) {
        layer.on({
            mouseover: this.highlightFeature,
            mouseout: this.resetHighlight,
            click: this.zoomToFeature           
        })
    }
    
    render(){
        return (
           
                <div className='container'>
                    <div className='row clearfix'>
                         <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            
               
                <div className='card maps'>
                    <div style={{position: 'sticky', overflow: 'hidden'}}>
                        {!this.state.name ? (
                        
                        <div className='hover'>Touch or Hover over an area</div>
                        ) : (
                                <div className='info'>
                                <strong>DHB: {this.state.name}</strong>
                                <span>Total Number of Cases: {this.state.total}</span>
                                <span>Active :{this.state.active}</span>
                                <span>Recovered :{this.state.recovered}</span>
                                <span>Deceased :{this.state.deceased}</span>
                                <span>Changes in last 24 hours: {this.state.changes}</span>
                                </div>)}
                    <div className = 'legend'>
                            <div style={{"--color": cases_150}}>150+</div>
                            <div style={{"--color": cases_100}}>100+</div>
                            <div style={{"--color": cases_50}}>50+</div>
                            <div style={{"--color": cases_40}}>40+</div>
                            <div style={{"--color": cases_15}}>15+</div>
                            <div style={{"--color": cases_0}}>0+</div>
                    </div>          
                    <div id="map"></div>
                    </div>
                {/* </div> */}
            </div>

            </div>
                    </div>
                </div>
           
           
          
        )
    }
}


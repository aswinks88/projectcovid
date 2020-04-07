import React, { Component } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default class Leaflet extends Component {
    componentDidMount(){
        this.map = L.map('map', {
            center: [-40.9006,174.886],
            zoom: 6,
            zoomControl: false
        })
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            detectRetina: true,
            maxZoom: 20,
            maxNativeZoom: 17
        }).addTo(this.map)
    }
    render(){
        return (
            <div style={{width:'800px', height:'720px'}} id='map'></div>
        )
    }
}

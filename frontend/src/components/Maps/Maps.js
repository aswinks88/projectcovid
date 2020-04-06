import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

function Maps() {
  const [viewport, setViewport] = useState({
    width: 800,
    height: 600,
    latitude: -40.9006,
    longitude: 174.886,
    zoom: 4
  });
const TOKEN = 'pk.eyJ1IjoiYXN3aW5rczg4IiwiYSI6ImNrOG52YTAwNjB1ZmgzaXFjeXBpazhldTcifQ.050p57eEAwuv0rka7gwEdg'
  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={TOKEN}
      onViewportChange={setViewport}
    />
  );
}

export default Maps

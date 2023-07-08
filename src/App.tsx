import React, { useState, useEffect } from 'react';
//import GoogleMapReact from 'google-map-react';
import { Polygon, Marker, OverlayView, GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import logo from './logo.svg';
import './App.css';
import {network, fetchVehiclesLocations, fetchVehiclesInPolygon} from '../src/network'

const Map = ({polygonCoordinates, setPolygonCoordinates, vehiclesLocations}: any) => {
  const [zoom, setZoom] = useState(13);
  const [showMarker, setShowMarker] = useState(false);
  const [showVehicles, setShowVehicles] = useState(false);

  useEffect(() => {
    setShowMarker(true);
  }, [polygonCoordinates]);

  useEffect(() => {
    setShowVehicles(true);
  }, [vehiclesLocations]);

  const handleMapClick = (event : any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    if (showVehicles) {
      setShowVehicles(false);
      setPolygonCoordinates([]);
    }
    //@ts-ignore
    setPolygonCoordinates((prevCoordinates) => [...prevCoordinates, { lat, lng }]);
    console.log('Polygon drawn:', polygonCoordinates);
  };

  const CarOverlay = () => (
    <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
      <img src="https://www.svgrepo.com/download/10703/car.svg" alt="Car Icon" width="40" height="40" />
    </div>
  );

  const DotOverlay = () => (
    <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
      <img src='https://www.svgrepo.com/show/491399/dot-small.svg' alt="Dot Icon" width="40" height="40" />
    </div>
  );


  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBQgYDGbw-UjuTy8BMapIcvUUkKVTHw9P8',
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  
const onLoad = (polygon : any) => {
  console.log("polygon: ", polygon);
}


const options = {
  fillColor: 'lightblue',
  fillOpacity: 0.6,
  strokeColor: 'red',
  strokeOpacity: 1,
  strokeWeight: 2,
};

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={zoom}
        onClick={handleMapClick}
      >
        {showVehicles && 
        vehiclesLocations.map((vehicle : any, index : any) => (
        <OverlayView
          key={index}
          position={vehicle.location}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
          <CarOverlay />
        </OverlayView>
      ))}
      {showMarker && 
      <Polygon
          onLoad={onLoad}
          paths={polygonCoordinates}
          options={options}
      />
  }
      </GoogleMap>
    </div>
  );
};

const App = () => {
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [vehiclesLocations, setVehiclesLocations] = useState([]);


  const handleAllVehiclesClick = async () => {
    const vehiclesLocations = await fetchVehiclesLocations();
    console.log(vehiclesLocations);
  };
  const handlePolygonClick = async () => {
    const vehiclesLocations = await fetchVehiclesInPolygon(polygonCoordinates);
    setVehiclesLocations(vehiclesLocations);
    console.log(vehiclesLocations);
  };

  return (
    <div>
      <Map 
      polygonCoordinates={polygonCoordinates}
      setPolygonCoordinates={setPolygonCoordinates}
      vehiclesLocations={vehiclesLocations}
      />
      <button onClick={handleAllVehiclesClick}>Get All Vehicles</button>
      <button onClick={handlePolygonClick}>Get Vehicles in polygon</button>
    </div>
  );
};

export default App;

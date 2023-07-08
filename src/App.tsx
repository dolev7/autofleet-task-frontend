import React, { useState } from 'react';
//import GoogleMapReact from 'google-map-react';
import { Polygon, Marker, OverlayView, GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import logo from './logo.svg';
import './App.css';
import {network, fetchVehiclesLocations, fetchVehiclesInPolygon} from '../src/network'

const Map = ({polygonCoordinates, setPolygonCoordinates, gotVehiclePositions, vehiclesLocations}: any) => {
  const [zoom, setZoom] = useState(13);
  const [showPolygon, setShowPolygon] = useState(false);
  const handleMapClick = (event : any) => {
    setShowPolygon(true);
    let lat = event.latLng.lat();
    let lng = event.latLng.lng();
    const temp = lat;
    lat = lng;
    lng = temp;
    //@ts-ignore
    setPolygonCoordinates((prevCoordinates) => [...prevCoordinates, { lat, lng }]);
    console.log('Polygon drawn:', polygonCoordinates);
  };

  const CarOverlay = () => (
    <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
      <img src="https://www.svgrepo.com/download/10703/car.svg" alt="Car Icon" width="40" height="40" />
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

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={zoom}
        onClick={handleMapClick}
      >
        {gotVehiclePositions && 
        vehiclesLocations.map((position : any, index : any) => (
        <OverlayView
          key={index}
          position= {position}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
          <CarOverlay />
        </OverlayView>
      ))}
      {showPolygon && (
        <Polygon
          paths={polygonCoordinates}
          options={{
            fillColor: '#FF0000', // Example fill color
            fillOpacity: 0.4, // Example fill opacity
            strokeColor: '#FF0000', // Example stroke color
            strokeOpacity: 1, // Example stroke opacity
            strokeWeight: 2, // Example stroke weight
          }}
        />
      )}
      </GoogleMap>
    </div>
  );
};

const App = () => {
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [vehiclesLocations, setVehiclesLocations] = useState([]);
  const [gotVehiclePositions, setVehiclePositions] = useState(false);

  const handleAllVehiclesClick = async () => {
    const vehiclesLocations = await fetchVehiclesLocations();
    console.log(vehiclesLocations);
  };
  const handlePolygonClick = async () => {
    const vehiclesLocations = await fetchVehiclesInPolygon(polygonCoordinates);
    setVehiclesLocations(vehiclesLocations);
    console.log(vehiclesLocations);
    setVehiclePositions(true);
  };

  return (
    <div>
      <Map 
      polygonCoordinates={polygonCoordinates}
      setPolygonCoordinates={setPolygonCoordinates}
      gotVehiclePositions={gotVehiclePositions}
      setVehiclePositions={setVehiclePositions}
      vehiclesLocations = {vehiclesLocations}
      />
      <button onClick={handleAllVehiclesClick}>Get All Vehicles</button>
      <button onClick={handlePolygonClick}>Get Vehicles in polygon</button>
    </div>
  );
};

export default App;




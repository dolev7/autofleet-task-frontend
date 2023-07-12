import { useState, useEffect } from 'react';
import { Polygon, Marker, OverlayView, GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import {fetchVehiclesLocations, fetchVehiclesInPolygon} from '../../../src/network'
import {Button} from './Button'

const Map = ({polygonCoordinates, setPolygonCoordinates}: any) => {
  const [showPolygon, setShowPolygon] = useState(false);
  const [showVehicles, setShowVehicles] = useState(false);
  const [showFirstCoord, setsShowFirstCoord] = useState(false);
  const [vehiclesDetails, setVehiclesDetails] = useState([]);


  useEffect(() => {
    setShowPolygon(true);
  }, [polygonCoordinates]);

  useEffect(() => {
    if (polygonCoordinates.length == 1) {
      setsShowFirstCoord(true);
    }
    else {
      setsShowFirstCoord(false);
    }
  }, [polygonCoordinates]);

  useEffect(() => {
    if (vehiclesDetails.length > 0) {
      setShowVehicles(true);
    }
  }, [vehiclesDetails]);

  const handleMapClick = (event : any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    if (showVehicles) {
      setShowVehicles(false);
      setPolygonCoordinates([]);
    }
    //@ts-ignore
    setPolygonCoordinates((prevCoordinates) => [...prevCoordinates, { lat, lng }]);
  };

  const CarOverlay = () => (
    <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
      <img src="https://www.svgrepo.com/download/10703/car.svg" alt="Car Icon" width="40" height="40" />
    </div>
  );


  const mapContainerStyle = {
    width: '100%',
    height: '100vh',
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBQgYDGbw-UjuTy8BMapIcvUUkKVTHw9P8',
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }


const options = {
  fillColor: 'lightblue',
  fillOpacity: 0.6,
  strokeColor: 'red',
  strokeOpacity: 1,
  strokeWeight: 2,
};

const handleAllVehiclesClick = async () => {
  const vehiclesDetails = await fetchVehiclesLocations();
  setVehiclesDetails(vehiclesDetails);
  console.log(vehiclesDetails);
};
const handlePolygonClick = async () => {
  if (polygonCoordinates.length === 0) {
    console.log ('cant find vehicles inside an empty polygon')
    return;
  }
  const vehiclesDetails = await fetchVehiclesInPolygon(polygonCoordinates);
  setVehiclesDetails(vehiclesDetails);
  console.log(vehiclesDetails);
};
const handleResetScreenClick = async () => {
  setVehiclesDetails([]);
  setPolygonCoordinates([])
};

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}
        onClick={handleMapClick}
      >
        {showVehicles && 
        vehiclesDetails.map((vehicle : any) => (
        <OverlayView
          key={vehicle.id}
          position={vehicle.location}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
          <CarOverlay />
        </OverlayView>
      ))}
      {showFirstCoord && 
      <Marker
        position={polygonCoordinates[0]}
      />
  }
      {showPolygon && 
      <Polygon
          paths={polygonCoordinates}
          options={options}
      />
  }
    <div
        style={{
          position: 'absolute',
          top: '50px',
          left: '10px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
      <Button 
        text={'Show Vehicles in polygon'}
        hoverText={'Click here after drawing a polygon on the map'}
        handleClick={handlePolygonClick}
      />
      <Button 
        text={'Show All Vehicles'}
        hoverText={'Click here to get all vehicles'}
        handleClick={handleAllVehiclesClick}
      />
      <Button 
        text={'Reset Screen'}
        hoverText={''}
        handleClick={handleResetScreenClick}
      />
    </div>
      </GoogleMap>
    </div>
  );
};

export default Map;

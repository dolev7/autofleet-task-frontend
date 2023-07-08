import { useState, useEffect } from 'react';
import { Polygon, OverlayView, GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import {fetchVehiclesLocations, fetchVehiclesInPolygon} from '../../../src/network'


const Map = ({polygonCoordinates, setPolygonCoordinates}: any) => {
  const [showPolygon, setShowPolygon] = useState(false);
  const [showVehicles, setShowVehicles] = useState(false);
  const [vehiclesLocations, setVehiclesLocations] = useState([]);


  useEffect(() => {
    setShowPolygon(true);
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
  const vehiclesLocations = await fetchVehiclesLocations();
  console.log(vehiclesLocations);
};
const handlePolygonClick = async () => {
  if (polygonCoordinates.length === 0) {
    //change to toaser
    console.log ('cant find vehicles inside an empty polygon')
    return;
  }
  const vehiclesLocations = await fetchVehiclesInPolygon(polygonCoordinates);
  setVehiclesLocations(vehiclesLocations);
  console.log(vehiclesLocations);
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
        vehiclesLocations.map((vehicle : any, index : any) => (
        <OverlayView
          key={index}
          position={vehicle.location}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
          <CarOverlay />
        </OverlayView>
      ))}
      {showPolygon && 
      <Polygon
          paths={polygonCoordinates}
          options={options}
      />
  }
            <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
      <button onClick={handleAllVehiclesClick}>Get All Vehicles</button>
      <button onClick={handlePolygonClick}>Get Vehicles in polygon</button>
          </div>

      </GoogleMap>
    </div>
  );
};

export default Map;

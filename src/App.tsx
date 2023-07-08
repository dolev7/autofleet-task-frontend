import {useState} from 'react';
import './App.css';
import {fetchVehiclesLocations, fetchVehiclesInPolygon} from '../src/network'
import Map from '../src/components/Map'

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

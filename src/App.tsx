import {useState} from 'react';
import './App.css';
import Map from '../src/components/Map'

const App = () => {
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);


  return (
    <div>
      <Map 
      polygonCoordinates={polygonCoordinates}
      setPolygonCoordinates={setPolygonCoordinates}
      />
    </div>
  );
};

export default App;

import axios from 'axios';

const BACKEND_URL = 'https://autofleet-task-245f137c7b1e.herokuapp.com/';
const network = axios.create({ baseURL: BACKEND_URL });


export const fetchVehiclesLocations = async () => {
  const { data: currentVehiclesLocations } = await network.get('vehicles');
  return currentVehiclesLocations;
};

export const fetchVehiclesInPolygon = async (coordinates: any) => {
  const jsonCoordinates = JSON.stringify(coordinates);
  const encodedCoordinates = encodeURIComponent(jsonCoordinates);
  try {
    const { data: vehiclesInPolygon, status } = await network.get(`vehicles/in-polygon?coordinates[]=${encodedCoordinates}`);
    if (status !== 200) {
      throw new Error(`got error ${status}`);
    } else {
      return vehiclesInPolygon;
    }
    } catch (error : any) {
    console.log('Error:', error.message);
    return [];
  }  
};


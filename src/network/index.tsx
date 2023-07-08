import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const network = axios.create({ baseURL: BACKEND_URL });


export const fetchVehiclesLocations = async () => {
  const { data: currentVehiclesLocations } = await network.get('vehicles');
  return currentVehiclesLocations;
};

export const fetchVehiclesInPolygon = async (coordinates: any) => {
  const jsonCoordinates = JSON.stringify(coordinates);
  const encodedCoordinates = encodeURIComponent(jsonCoordinates);
  const { data: vehiclesInPolygon } = await network.get(`vehicles/in-polygon?coordinates[]=${encodedCoordinates}`);
  return vehiclesInPolygon;
};


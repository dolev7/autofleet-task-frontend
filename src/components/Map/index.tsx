export {}
// import { useMapEvents , FeatureGroup} from 'react-leaflet';
// import { EditControl } from 'react-leaflet-draw';


// export const DrawEvents = ({ onPolygonDrawn }: any) => {
//   const handleDrawCreated = (event: any) => {
//     const { layerType, layer } = event;
//     if (layerType === 'polygon') {
//       const polygon = layer.getLatLngs()[0];
//       onPolygonDrawn(polygon);
//     }
//   };

//   return (
//     <FeatureGroup>
//       <EditControl position="topright" draw={{ rectangle: false }} onCreated={handleDrawCreated} />
//     </FeatureGroup>
//   );
// };
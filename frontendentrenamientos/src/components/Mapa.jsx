
// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import { Link } from 'react-router-dom';
// import { Button } from 'antd';
// // import Search from "react-leaflet-search";
// import PropTypes from 'prop-types';

// const LocateControl = () => {
//     const map = useMapEvents({
//         locate: ({ latlng }) => {
//             map.flyTo(latlng, map.getZoom());
//         },
//     });

//     return (
//         <Button onClick={() => map.locate()}>
//             Ubicar
//         </Button>
//     );
// };

// const MapPage = ({ position }) => {
//     return (
//         <div>
//             <Link to="/">
//                 <Button type="primary">Inicio</Button>
//             </Link>
//             <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 <Marker position={position}>
//                     <Popup>
//                         Cúcuta, Colombia
//                     </Popup>
//                 </Marker>
//           
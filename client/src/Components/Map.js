import React from 'react';
import { compose, withProps } from 'recompose';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '87vh' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(({ stops }) => {
  const markers = stops.map((stop, index) => (<Marker key={index} position={{ lat: stop.lat, lng: stop.lon }} />));
  const defaultCenter = stops[0]
    ? { lat: stops[0].lat, lng: stops[0].lon }
    : { lat: 40.8050757, lng: -73.8949258 };

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={defaultCenter}
    >
      {markers}
    </GoogleMap>
  );
});

export default Map;

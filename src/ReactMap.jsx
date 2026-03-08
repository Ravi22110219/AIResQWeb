import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Ensure Leaflet CSS is imported for proper rendering

const ReactMap = () => {
  return (
    <MapContainer
      center={[28.6139, 77.209]} // Default center coordinates
      zoom={10} // Default zoom level
      style={{ height: "500px", width: "100%" }} // Set height and width of the map container
    >
      {/* Google Maps Tile Layer */}
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // Use HTTPS for secure connections
        subdomains={["mt0", "mt1", "mt2", "mt3"]} // Google Maps subdomains
      />
    </MapContainer>
  );
};

export default ReactMap;

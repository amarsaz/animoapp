import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Mapbox({
  accessToken,
  center = [103.7414, 1.4854], // Johor Bahru
  zoom = 2,
  style = 'mapbox://styles/mapbox/streets-v12',
  markers = [],
  onMapLoaded = () => {},
  onMarkerClick = () => {}
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);

  // Initialize map
  useEffect(() => {
    if (map.current) return; // Initialize only once

    mapboxgl.accessToken = accessToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: style,
      center: center,
      zoom: zoom
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      onMapLoaded(map.current);
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    markers.forEach((markerData) => {
      const marker = new mapboxgl.Marker({
        color: markerData.color || '#FF0000'
      })
        .setLngLat(markerData.coordinates)
        .addTo(map.current);

      if (markerData.popup) {
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(markerData.popup);
        marker.setPopup(popup);
      }

      marker.getElement().addEventListener('click', () => {
        onMarkerClick(markerData);
      });

      markersRef.current.push(marker);
    });
  }, [markers]);

  return (
        <Card>
      <CardHeader>
        <CardTitle>Latest detection</CardTitle>
        <CardDescription>
          Showing the latest detection of animal from device.
        </CardDescription>
      </CardHeader>

      <CardContent>
            <div 
                ref={mapContainer} 
                className="mapbox-container"
                style={{
                    width: '100%',
                    height: '500px',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}
            />
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Makari%27s_Whiskers.jpg" alt="" /> */}
      </CardContent>
    </Card>

  );
}
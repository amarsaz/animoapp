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
  center = [103.08202365213722, 1.8575466636735622] as [number, number], // Updated coordinates
  zoom = 2,
  style = 'mapbox://styles/mapbox/streets-v12',
  markers = [],
  onMapLoaded = () => {},
  onMarkerClick = () => {}
}: {
  accessToken: string;
  center?: [number, number];
  zoom?: number;
  style?: string;
  markers?: any[];
  onMapLoaded?: (map: mapboxgl.Map) => void;
  onMarkerClick?: (marker: any) => void;
}) {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
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
      if (map.current) {
        onMapLoaded(map.current);
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Fly to center when center prop changes
  useEffect(() => {
    if (!map.current) return;

    map.current.flyTo({
      center: center,
      zoom: zoom,
      essential: true
    });
  }, [center, zoom]);

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
        <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Latest detection</CardTitle>
        <CardDescription>
          Showing the latest detection of animal from device.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 p-0 pb-6 px-6">
            <div
                ref={mapContainer}
                className="mapbox-container h-full w-full rounded-lg"
                style={{
                    minHeight: '300px'
                }}
            />
      </CardContent>
    </Card>

  );
}
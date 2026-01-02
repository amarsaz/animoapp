import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type MarkerData = {
  coordinates: [number, number]
  color?: string
  popup?: string
}

export default function Mapbox({
  accessToken,
  center = [103.08202365213722, 1.8575466636735622],
  zoom = 13,
  style = 'mapbox://styles/mapbox/streets-v12',
  markers = [],
  onMapLoaded = () => {},
  onMarkerClick = () => {},
}: {
  accessToken: string
  center?: [number, number]
  zoom?: number
  style?: string
  markers?: MarkerData[]
  onMapLoaded?: (map: mapboxgl.Map) => void
  onMarkerClick?: (marker: MarkerData) => void
}) {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  // ✅ Init map (client-only)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!mapContainer.current || mapRef.current) return

    mapboxgl.accessToken = accessToken

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style,
      center,
      zoom,
    })

    mapRef.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    )

    mapRef.current.on('load', () => {
      onMapLoaded(mapRef.current!)
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [accessToken])

  // ✅ Fly to new center
  useEffect(() => {
    if (!mapRef.current) return

    mapRef.current.flyTo({
      center,
      zoom,
      essential: true,
    })
  }, [center, zoom])

  // ✅ Update markers
  useEffect(() => {
    if (!mapRef.current) return

    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    markers.forEach(markerData => {
      const marker = new mapboxgl.Marker({
        color: markerData.color ?? '#FF0000',
      })
        .setLngLat(markerData.coordinates)
        .addTo(mapRef.current!)

      if (markerData.popup) {
        marker.setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(markerData.popup)
        )
      }

      marker.getElement().addEventListener('click', () => {
        onMarkerClick(markerData)
      })

      markersRef.current.push(marker)
    })
  }, [markers])

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Latest detection</CardTitle>
        <CardDescription>
          Showing the latest detection of animal from device.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 p-0 px-6 pb-6">
        <div
          ref={mapContainer}
          className="h-full w-full rounded-lg"
          style={{ minHeight: '500px' }}
        />
      </CardContent>
    </Card>
  )
}

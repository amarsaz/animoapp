"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"

const REFRESH_INTERVAL = 120000 // 2 minutes

const deviceId = 'PI-001'
// const DEVICES = [
//   { id: 'PI-001', label: 'Malayan Tiger (Raspberry Pi)', color: 'bg-red-500' },
//   { id: 'PI-002', label: 'Malayan Tiger (Raspberry Pi Zero)', color: 'bg-violet-500' },
//   { id: 'PI-003', label: 'Malayan Tiger (Raspberry Pi)', color: 'bg-blue-500' },
// ]

type DeviceData = {
  device_id: string
  lat: string
  lng: string
  created_at: string
}

export function TrackingDevice() {
  const [data, setData] = useState<DeviceData[]>([])

  const loadTrackingData = async () => {
    const results: Record<string, DeviceData | null> = {}

    try {
      const res = await axios.get(`/api/gps/coordinate/${deviceId}/history`)
      console.log('RESPON' ,res.data)
      setData(res.data)
    } catch (err) {
      console.log('Error: TrackingDevice api call' , err)
    }
  }

  useEffect(() => {
    loadTrackingData()

    const interval = setInterval(() => {
      loadTrackingData()
    }, REFRESH_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tracking device</CardTitle>
        <CardDescription>
          Showing the latest detection of animal from device.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {data.map((d) => (
          <Card key={d.id}>
            <CardContent>
              <div className="flex gap-3">
                <div className="min-w-10 min-h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>

                <div className="flex w-full flex-col">
                  <h3 className="font-semibold text-sm truncate">
                    {d.device_id}
                  </h3>

                  <p className="text-xs text-muted-foreground whitespace-nowrap">
                    {d.lat}, {d.lng}
                  </p>
                </div>

                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(d.created_at).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}

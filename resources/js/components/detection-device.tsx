"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bot } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"

const REFRESH_INTERVAL = 120000 // 2 minutes
const MAX_CARDS = 3

type DetectionData = {
  animal: string
  confidence: number
  created_at: string
}

export function DetectionDevice() {
  const [detections, setDetections] = useState<DetectionData[]>([])

  const loadLatestDetection = async () => {
    try {
      const res = await axios.get("/api/detection/latest")
      const latest: DetectionData = res.data

      setDetections((prev) => {
        // Prevent duplicate insert (same timestamp)
        if (prev[0]?.created_at === latest.created_at) {
          return prev
        }

        const updated = [latest, ...prev]
        return updated.slice(0, MAX_CARDS)
      })
    } catch (err) {
      console.error("Failed to fetch detection")
    }
  }

  useEffect(() => {
    loadLatestDetection()

    const interval = setInterval(() => {
      loadLatestDetection()
    }, REFRESH_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detection Device</CardTitle>
        <CardDescription>
          Latest detections from Raspberry Pi 5
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {detections.length === 0 && (
          <p className="text-muted-foreground">
            Waiting for detection...
          </p>
        )}

        {detections.map((d, index) => (
          <Card key={d.created_at}>
            <CardContent>
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-sm">
                    Raspberry Pi 5
                  </p>

                  <p className="text-sm">
                    Animal: <b>{d.animal}</b>
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Confidence: {(d.confidence * 100).toFixed(1)}%
                  </p>
                </div>

                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(d.created_at).toLocaleTimeString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}

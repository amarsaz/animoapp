"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bot, MapPin } from "lucide-react"

export const description = "A simple area chart"

export function TrackingDevice() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tracking device</CardTitle>
        <CardDescription>
          Showing the latest detection of animal from device.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <Card>
            <CardContent>

                <div className="flex gap-3">
                    <div className="min-w-10 min-h-10 bg-red-500 rounded-full flex items-center justify-center" >
                        <MapPin className="h-5 w-5 text-white" />
                    </div>                    
                    <div className="flex w-full flex-col">
                        <h3 className="font-semibold text-sm flex-1 truncate">Malayan Tiger (Raspberry Pi)</h3>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">2.0022476158175797, 103.32360506022891</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                    2 hours ago
                    </span>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardContent>

                <div className="flex gap-3">
                    <div className="min-w-10 min-h-10 bg-violet-500 rounded-full flex items-center justify-center" >
                        <MapPin className="h-5 w-5 text-white" />
                    </div>                    
                    <div className="flex w-full flex-col">
                        <h3 className="font-semibold text-sm flex-1 truncate">Malayan Tiger (Raspberry Pi Zero)</h3>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">2.0022476158175797, 103.32360506022891</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                    2 hours ago
                    </span>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardContent>

                <div className="flex gap-3">
                    <div className="min-w-10 min-h-10 bg-blue-500 rounded-full flex items-center justify-center" >
                        <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex w-full flex-col">
                        <h3 className="font-semibold text-sm flex-1 truncate">Malayan Tiger (Raspberry Pi)</h3>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">2.0022476158175797, 103.32360506022891</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                    2 hours ago
                    </span>
                </div>
            </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

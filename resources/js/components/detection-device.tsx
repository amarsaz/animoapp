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

export function DetectionDevice() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detection Device</CardTitle>
        <CardDescription>
          Showing the latest detection of animal from camera device.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <Card>
            <CardContent>
                <div className="flex gap-4 items-center">
                    <div className="flex flex-col flex-1 min-w-0">
                        <h3 className="font-semibold text-base truncate">Camera 9</h3>
                        <p className="text-xs text-muted-foreground mt-1">12 June 2020 2.03 a.m</p>
                    </div>
                    <div className="flex-shrink-0">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Makari%27s_Whiskers.jpg" 
                                alt="Biawak device"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardContent>
                <div className="flex gap-4 items-center">
                    <div className="flex flex-col flex-1 min-w-0">
                        <h3 className="font-semibold text-base truncate">Camera 1</h3>
                        <p className="text-xs text-muted-foreground mt-1">12 June 2020 2.03 a.m</p>
                    </div>
                    <div className="flex-shrink-0">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Makari%27s_Whiskers.jpg" 
                                alt="Biawak device"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardContent>
                <div className="flex gap-4 items-center">
                    <div className="flex flex-col flex-1 min-w-0">
                        <h3 className="font-semibold text-base truncate">Camera 20</h3>
                        <p className="text-xs text-muted-foreground mt-1">12 June 2020 2.03 a.m</p>
                    </div>
                    <div className="flex-shrink-0">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Makari%27s_Whiskers.jpg" 
                                alt="Biawak device"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

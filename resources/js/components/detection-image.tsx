"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const description = "A simple area chart"

export function DetectionImage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest detection</CardTitle>
        <CardDescription>
          Showing the latest detection of animal from device.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Makari%27s_Whiskers.jpg" alt="" />
      </CardContent>
    </Card>
  )
}

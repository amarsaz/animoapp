"use client";

import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { Clock, TrendingUp, Activity, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// -----------------------------------------------------------------------------
// Breadcrumbs
// -----------------------------------------------------------------------------
const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Schedule", href: "/schedule" },
];

// -----------------------------------------------------------------------------
// BASE STATIC DATA
// -----------------------------------------------------------------------------
const BASE_DATA = {
  tiger: {
    name: "MALAYAN TIGER",
    behavior: "Hunting and territorial patrol",
    peakHours: [
      { icon: Moon, time: "22:00–02:00" },
      { icon: Moon, time: "05:00–07:00" },
    ],
    seasonalPattern: "Year-round",
  },

  elephant: {
    name: "ASIAN ELEPHANT",
    behavior: "Foraging and social interaction",
    peakHours: [
      { icon: Sun, time: "06:00–10:00" },
      { icon: Sun, time: "16:00–20:00" },
    ],
    seasonalPattern: "Dry season peak",
  },

  "orang utan": {
    name: "ORANG UTAN",
    behavior: "Feeding and tree movement",
    peakHours: [
      { icon: Sun, time: "07:00–11:00" },
      { icon: Moon, time: "18:00–21:00" },
    ],
    seasonalPattern: "Fruit season peak",
  },
} as const;

type AnimalKey = keyof typeof BASE_DATA;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
export default function Schedule() {
  const [levels, setLevels] = useState<
    Record<
      AnimalKey,
      {
        count: number;
        level: string;
        color: string;
        confidence: number | null;
        timestamp: string | null;
      } | undefined
    >
  >({
    tiger: undefined,
    elephant: undefined,
    "orang utan": undefined,
  });

  // Fetch activity levels from backend
  useEffect(() => {
    fetch("/api/activity-levels")
      .then((res) => res.json())
      .then((data) => setLevels(data))
      .catch((err) => console.error("Failed to fetch activity levels:", err));
  }, []);

  // Level → bar percentage
  const levelToValue = (level?: string) => {
    if (!level) return 0;
    if (level === "Low") return 30;
    if (level === "Medium") return 60;
    if (level === "High") return 90;
    return 0;
  };

  // Level → color
  const colorToClass = (color?: string) => {
    switch (color) {
      case "green":
        return "bg-green-500";
      case "yellow":
        return "bg-yellow-500";
      case "red":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Activity Schedule" />

      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Activity Schedule
          </h1>
          <p className="text-gray-600">
            Animal behavior patterns and peak activity times
          </p>
        </div>

        <div className="space-y-4">
          {(Object.keys(BASE_DATA) as AnimalKey[]).map((key) => {
            const data = BASE_DATA[key];
            const live = levels[key];

            return (
              <Card
                key={key}
                className="border-2 border-blue-200 hover:border-blue-400 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {data.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 mt-1">
                        {data.behavior}
                      </CardDescription>
                    </div>

                    {/* ⭐ Activity Level + Confidence Display ⭐ */}
                    <div className="flex gap-2">
                      <Badge className={colorToClass(live?.color) + " text-white"}>
                        {live?.level || "Loading..."}
                      </Badge>

                      <Badge variant="outline" className="border-gray-300">
                        {live?.confidence !== null && live?.confidence !== undefined
                          ? `${live.confidence}% Confidence`
                          : "Waiting..."}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-3 gap-8">
                    {/* Peak Activity Hours */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="h-5 w-5 text-gray-700" />
                        <h3 className="font-semibold text-gray-900">
                          Peak Activity Hours
                        </h3>
                      </div>

                      <div className="space-y-2">
                        {data.peakHours.map((ph, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-gray-700">
                            <ph.icon className="h-4 w-4" />
                            <span>{ph.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Seasonal Pattern */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="h-5 w-5 text-gray-700" />
                        <h3 className="font-semibold text-gray-900">Seasonal Pattern</h3>
                      </div>
                      <p className="text-gray-700">{data.seasonalPattern}</p>
                    </div>

                    {/* ⭐ Dynamic Activity Level Bar ⭐ */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Activity className="h-5 w-5 text-gray-700" />
                        <h3 className="font-semibold text-gray-900">Activity Level</h3>
                      </div>

                      <div className="w-full h-2 bg-gray-200 rounded relative overflow-hidden">
                        <div
                          className={`h-full rounded transition-all duration-500 ${colorToClass(
                            live?.color
                          )}`}
                          style={{ width: `${levelToValue(live?.level)}%` }}
                        />
                      </div>

                      <p className="text-right text-sm text-gray-700 mt-1">
                        {live?.level || "Loading..."}
                      </p>

                      {/* Optional timestamp */}
                      {live?.timestamp && (
                        <p className="text-xs text-gray-500 text-right mt-1">
                          Last seen: {new Date(live.timestamp).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}

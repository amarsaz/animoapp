"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";

export function DetectionDevice() {
  const [latest, setLatest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchLatest = async () => {
    try {
      const res = await fetch("/api/camera/latest");
      const data = await res.json();
      setLatest(data);
    } catch (err) {
      console.error("Error fetching detection:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatest();
    const interval = setInterval(fetchLatest, 120000); // every 2 minutes
    return () => clearInterval(interval);
  }, []);

  // 🦁 Map animal → images in /public/detections/
  const getImagePath = (animal: string) => {
    return `/detections/${animal}.jpeg`; // elephant.jpeg, tiger.jpeg, orang utan.jpeg
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detection Device</CardTitle>
        <CardDescription>
          Showing the latest detection of animal from camera device.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : !latest ? (
          <p className="text-gray-500">No detection yet</p>
        ) : (
          <Card>
            <CardContent>
              <div className="flex gap-4 items-center">
                {/* LEFT TEXT */}
                <div className="flex flex-col flex-1 min-w-0">
                  <h3 className="font-semibold text-base truncate">
                    Camera 9 {/* static name or we can dynamic later */}
                  </h3>

                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(latest.timestamp).toLocaleString()}
                  </p>
                </div>

                {/* RIGHT IMAGE */}
                <div className="flex-shrink-0">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200">
                    <img
                      src={getImagePath(latest.animal)}
                      alt={latest.animal}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

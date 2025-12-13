"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Map YOLO class → your static images in /public/detections/
const animalImages: Record<string, string> = {
  "tiger": "/detections/tiger.jpeg",
  "elephant": "/detections/elephant.jpeg",
  "orang utan": "/detections/orang utan.jpeg",
};

export function DetectionImage() {
  const [latest, setLatest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchLatest = async () => {
    try {
      const res = await fetch("/api/camera/latest");
      const data = await res.json();
      setLatest(data);
    } catch (err) {
      console.error("Failed to fetch detection:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatest();
    const interval = setInterval(fetchLatest, 120000); // every 2 minutes
    return () => clearInterval(interval);
  }, []);

  const getImage = () => {
    if (!latest) return "/detections/default.jpeg";
    return animalImages[latest.animal] || "/detections/default.jpeg";
  };

  const formatTimestamp = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-MY", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest detection</CardTitle>
        <CardDescription>
          Showing the latest detection of animal from device.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* LOADING + EMPTY */}
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : !latest ? (
          <p className="text-gray-500">No detection yet.</p>
        ) : (
          <>
            {/* IMAGE */}
            <div className="relative w-full rounded-lg overflow-hidden">
              <img
                src={getImage()}
                alt={latest.animal}
                className="w-full h-full object-cover"
              />
            </div>

            {/* TIMESTAMP */}
            <p className="text-sm text-muted-foreground mt-3">
              Detected at: {formatTimestamp(latest.timestamp)}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

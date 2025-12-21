import AppLayout from '@/layouts/app-layout';
import { TotalDetectionChart } from '@/components/total-detection-chart';
import MapboxComponent from '@/components/mapbox';
import { usePage, Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TrackingDevice } from '@/components/tracking-device';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
];

export interface MonthlyStat {
  month: string;
  count: number;
}

type PageProps = {
  monthlyStats: MonthlyStat[];
};

export default function Dashboard() {
  const { monthlyStats } = usePage<PageProps>().props;

  // 📌 Convert backend monthlyStats to chart format
  const areaChartData = (monthlyStats || []).map((item) => ({
    name: item.month,
    total: item.count,
  }));



  // ⭐ LIVE DETECTION STATE
  const [latest, setLatest] = useState<{
    animal: string;
    timestamp: string;
  } | null>(null);

  // ⭐ LIVE DETECTION STATE
  const [deviceCoordinate, setDeviceCoordinate] = useState<{
    id: number;
    device_id: string;
    lat: string;
    lng: string;
    created_at: string;
  } | null>(null);

  // ⭐ Static image mapping (match YOLO names EXACTLY)
  const animalImages: Record<string, string> = {
    'elephant': '/images/animals/elephant.jpeg',
    'orang utan': '/images/animals/orang_utan.jpeg',
    'tiger': '/images/animals/tiger.jpeg',
  };

  // 📌 Mapbox dummy markers (OK to keep)
  const [markers, setMarkers] = useState([
    {
      coordinates: [103.3687762, 1.9893272],
      color: '#FF0000',
      popup: 'PI-001',
    },
  ]);
  const loadDeviceCoordinate = async () => {
    try {
      const res = await axios.get('/api/gps/coordinate/PI-001');
      const data = res.data;

      // 1. Update deviceCoordinate state
      setDeviceCoordinate(data);

      // 2. Update markers state (Mapbox needs [lng, lat] as numbers)
      setMarkers([
        {
          coordinates: [Number(data.lng), Number(data.lat)],
          color: '#FF0000',
          popup: `
            <strong>Device:</strong> ${data.device_id}<br/>
            <strong>Time:</strong> ${new Date(data.created_at).toLocaleString()}
          `,
        },
      ]);

    } catch (error) {
      console.error('Failed to fetch latest detection:', error);
    }
  };

  // ⭐ Auto-refresh every 2 minutes
  useEffect(() => {
    // loadLatest();
    loadDeviceCoordinate()
    const interval = setInterval(loadDeviceCoordinate, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <h1 className="text-lg font-bold m-4">Dashboard</h1>
=
      {/* ⭐ TOP ROW */}
      <div className="w-full grid grid-cols-3 gap-4 mx-4">
        {/* Area Chart */}
        <TotalDetectionChart data={areaChartData} />

        {/* ⭐ Latest Detection Card */}
        <div className="p-5 bg-white shadow rounded-xl border">
          <h2 className="text-xl font-bold mb-2">Latest Detection</h2>
          <p className="text-gray-500 mb-4">Showing the latest detection from the device</p>

          {latest ? (
            <>
              <img
                src={animalImages[latest.animal]}
                className="rounded-xl w-full h-64 object-cover"
              />
              <p className="mt-3 text-lg">
                <b>Animal:</b> {latest.animal}
              </p>
              <p>
                <b>Detected:</b> {new Date(latest.timestamp).toLocaleString()}
              </p>
            </>
          ) : (
            <p>No detection yet...</p>
          )}
        </div>

        {/* Mapbox */}
        <MapboxComponent
          accessToken="pk.eyJ1IjoiYW1hcnNheiIsImEiOiJjbWdiMzljcDEwZDJtMnBwazU0N29oeDF6In0.STcvu9bAbkxnFWtglzjpiw"
          center={
            markers.length > 0
              ? markers[0].coordinates
              : [103.08202365213722, 1.8575466636735622]
          }
          zoom={13}
          markers={markers}
        />
      </div>

      {/* ⭐ BOTTOM ROW */}
      <div className="w-full grid grid-cols-3 gap-4 m-4">
        <TotalDetectionChart data={areaChartData} />

        {/* ⭐ Detection Device Card */}
        <div className="p-4 bg-white shadow rounded-xl border">
          <h2 className="font-semibold text-lg">Detection Device</h2>
          {latest ? (
            <div className="flex items-center gap-4 mt-3">
              <img
                src={animalImages[latest.animal]}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p><b>Device:</b> Raspberry Pi 5</p>
                <p><b>Animal:</b> {latest.animal}</p>
                <p><b>Time:</b> {new Date(latest.timestamp).toLocaleTimeString()}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Waiting for detection...</p>
          )}
        </div>

        {/* Keep your existing tracking component */}
        <TrackingDevice />
      </div>
    </AppLayout>
  );
}

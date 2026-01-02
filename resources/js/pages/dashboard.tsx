import AppLayout from '@/layouts/app-layout';
import { TotalDetectionChart } from '@/components/total-detection-chart';
import MapboxComponent from '@/components/mapbox';
import { usePage, Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TrackingDevice } from '@/components/tracking-device';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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


export default function Dashboard({ detection }) {
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
  const defaultCoordinates = { lng: 103.3687762, lat: 1.9893272 };

  const loadDeviceCoordinate = async () => {
    try {
      const res = await axios.get('/api/gps/coordinate/PI-001');
      const data = res.data;

      // Check if response is empty or missing required fields
      if (!data || Object.keys(data).length === 0 || !data.lng || !data.lat) {
        console.warn('Empty or invalid response, using fallback coordinates');
        setDeviceCoordinate(null);
        setMarkers([
          {
            coordinates: [defaultCoordinates.lng, defaultCoordinates.lat],
            color: '#808080',
            popup: 'PI-001 (No data available)',
          },
        ]);
        return;
      }

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
      console.error('Failed to fetch device coordinate:', error);
      // Fallback on error
      setDeviceCoordinate(null);
      setMarkers([
        {
          coordinates: [defaultCoordinates.lng, defaultCoordinates.lat],
          color: '#808080',
          popup: 'PI-001 (Connection error)',
        },
      ]);
    }
  };

  //1. State untuk hold value daripada response api bawah.
  const [history, setHistory] = useState([])

  //2. Api call detection history
  const getDetectionHistory = async () => 
  {
     try {
      const res = await axios.get('api/camera/detectionhistory');
      const data = res.data;

      // Pegang value daripada response api call (history)
      setHistory(res.data)
     }catch(err){
      console.log('Error', err)
     }

  }
  useEffect(() => {
    getDetectionHistory()
  }, [])

  // ⭐ Auto-refresh every 10 seconds
  useEffect(() => {
    // loadLatest();
    loadDeviceCoordinate();
    const interval = setInterval(loadDeviceCoordinate, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <h1 className="text-lg font-bold m-4">Dashboard</h1>

      {/* ⭐ TOP ROW */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Area Chart */}
        {/* <TotalDetectionChart data={areaChartData} /> */}
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
        {/* ⭐ Latest Detection Card */}

        {/* Keep your existing tracking component */}
        <div className="p-5 bg-white shadow rounded-xl border">
          <h2 className="text-xl font-bold mb-2">Latest Detection</h2>
          <p className="text-gray-500 mb-4">Showing the latest detection from the device</p>

          {detection ? (
            <>
              <img
                src={detection?.image}
                className="rounded-xl w-full h-64 object-cover"
              />
              <p className="mt-3 text-lg">
                <b>Animal:</b> {detection?.animal}
              </p>
              <p>
                <b>Detected:</b> {new Date(detection?.timestamp).toLocaleString()}
              </p>
            </>
          ) : (
            <p>No detection yet...</p>
          )}
        </div>
        <TrackingDevice />

        <div className="p-4 bg-white shadow rounded-xl border">
          <h2 className="font-semibold text-lg">Detection Device</h2>

          {history.map((h) => (
            <>
              <Card className="w-full p-4">
                <div className="flex items-center justify-between gap-4">
                  {/* Left content */}
                  <div className="space-y-1">
                    <p><b>Device:</b> Raspberry Pi 5</p>
                    <p><b>Animal:</b> {h.animal}</p>
                    <p><b>Time:</b> {new Date(h.created_at).toLocaleString()}</p>
                    <p><b>Confidence:</b> {h.confidence}</p>
                  </div>

                  {/* Right image */}
                  <img
                    src={h.image_path}
                    alt="Animal"
                    className="w-20 h-20 rounded-xl object-cover border"
                  />
                </div>
              </Card>

            </>
            ))}
        </div>


      </div>


    </AppLayout>
  );
}

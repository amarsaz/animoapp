import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, MapPin, Activity, Clock } from 'lucide-react';
import Mapbox from '@/components/mapbox';

// 👇 describe ONE row of tracking data coming from Laravel
type TrackingItem = {
  id: number;
  deviceId: string;
  animalName: string;
  latitude: number;
  longitude: number;
  status: string;
  battery: string;          // e.g. "85%"
  signalStrength: string;   // "Strong" | "Medium" | "Weak"
  date: string;             // formatted date
  time: string;             // formatted time
};

// Detection frequency data for visualization
const detectionStats = [
  { day: 'Mon', count: 12 },
  { day: 'Tue', count: 15 },
  { day: 'Wed', count: 8 },
  { day: 'Thu', count: 18 },
  { day: 'Fri', count: 14 },
  { day: 'Sat', count: 10 },
  { day: 'Sun', count: 9 },
];

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Data Visualization',
    href: '/data-visualization',
  },
];

export default function DataVisualization() {
  // 👇 tell Inertia what props we expect
  const { trackingData } = usePage<{ trackingData: TrackingItem[] }>().props;

  // Prepare markers for the map
  const markers = 
    trackingData.filter((data) => data.status === 'Active')
    .map((data) => ({
      coordinates: [data.longitude, data.latitude] as [number, number],
      color: data.status === 'Active' ? '#22c55e' : '#ef4444',
      popup: `<h3>${data.animalName}</h3>
              <p>Device: ${data.deviceId}</p>
              <p>Last seen: ${data.date} ${data.time}</p>`,
    }));

  const maxCount = Math.max(...detectionStats.map((d) => d.count));

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Data Visualization" />

      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Visualization</h1>
          <p className="text-gray-600">Real-time tracking and detection analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {trackingData.filter((d) => d.status === 'Active').length}
              </div>
              <p className="text-xs text-muted-foreground">
                of {trackingData.length} total devices
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Detections</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">86</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Coverage Area</CardTitle>
              <MapPin className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5 km²</div>
              <p className="text-xs text-muted-foreground">Monitored region</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4 min</div>
              <p className="text-xs text-muted-foreground">Detection to alert</p>
            </CardContent>
          </Card>
        </div>

        {/* Map and Chart Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Detection Map */}
          <Mapbox
            accessToken="pk.eyJ1IjoiYW1hcnNheiIsImEiOiJjbWdiMzljcDEwZDJtMnBwazU0N29oeDF6In0.STcvu9bAbkxnFWtglzjpiw"
            center={[103.08202365213722, 1.8575466636735622]}
            zoom={13}
            markers={markers}
          />

          {/* Detection Frequency Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Detection Frequency</CardTitle>
              <CardDescription>Weekly detection patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {detectionStats.map((stat) => (
                  <div key={stat.day} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium text-gray-600">
                      {stat.day}
                    </div>
                    <div className="flex-1">
                      <div className="h-8 bg-gray-100 rounded-md overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 flex items-center justify-end pr-2 transition-all"
                          style={{ width: `${(stat.count / maxCount) * 100}%` }}
                        >
                          <span className="text-xs text-white font-medium">
                            {stat.count}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tracking Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Tracking Device Data</CardTitle>
            <CardDescription>Real-time location and status information</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device ID</TableHead>
                  <TableHead>Animal</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead>Battery</TableHead>
                  <TableHead>Signal</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trackingData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell className="font-medium">
                      {data.deviceId}
                    </TableCell>
                    <TableCell>{data.animalName}</TableCell>
                    <TableCell className="text-sm">
                      <div>
                        {data.latitude.toFixed(4)}, {data.longitude.toFixed(4)}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>{data.date}</div>
                      <div className="text-gray-500">{data.time}</div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          parseInt(data.battery) > 50 ? 'default' : 'destructive'
                        }
                      >
                        {data.battery}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          data.signalStrength === 'Strong'
                            ? 'default'
                            : data.signalStrength === 'Medium'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {data.signalStrength}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          data.status === 'Active' ? 'default' : 'secondary'
                        }
                      >
                        {data.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

import AppLayout from '@/layouts/app-layout';
import { TotalDetectionChart } from '@/components/total-detection-chart';
import { DetectionImage } from '@/components/detection-image';
import MapboxComponent from '@/components/mapbox';
import { usePage, Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { DetectionDevice } from '@/components/detection-device';
import { TrackingDevice } from '@/components/tracking-device';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
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

  // ✅ Convert backend monthlyStats into chart format
  const areaChartData = (monthlyStats || []).map((item) => ({
    name: item.month,
    total: item.count,
  }));

  // ✅ Keep your current dummy markers for now (safe)
  const [markers] = useState([
    {
      coordinates: [103.08202365213722, 1.8575466636735622],
      color: '#FF0000',
      popup: '<h3>Detection Location 1</h3><p>Latest detection point</p>',
    },
    {
      coordinates: [103.08302365213722, 1.8585466636735622],
      color: '#0000FF',
      popup: '<h3>Detection Location 2</h3><p>Second detection point</p>',
    },
    {
      coordinates: [103.08102365213722, 1.8565466636735622],
      color: '#800080',
      popup: '<h3>Detection Location 3</h3><p>Third detection point</p>',
    },
  ]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <h1 className="text-lg font-bold m-4">Dashboard</h1>

      {/* ✅ TOP ROW */}
      <div className="w-full grid grid-cols-3 gap-4 mx-4">
        {/* ✅ REAL MONTHLY GRAPH */}
        <TotalDetectionChart data={areaChartData} />

        <DetectionImage />

        <MapboxComponent
          accessToken="pk.eyJ1IjoiYW1hcnNheiIsImEiOiJjbWdiMzljcDEwZDJtMnBwazU0N29oeDF6In0.STcvu9bAbkxnFWtglzjpiw"
          center={[103.08202365213722, 1.8575466636735622]}
          zoom={13}
          markers={markers}
        />
      </div>

      {/* ✅ BOTTOM ROW */}
      <div className="w-full grid grid-cols-3 gap-4 m-4">
        <TotalDetectionChart data={areaChartData} />
        <DetectionDevice />
        <TrackingDevice />
      </div>
    </AppLayout>
  );
}

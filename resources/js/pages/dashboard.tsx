import AppLayout from '@/layouts/app-layout';
import { TotalDetectionChart } from '@/components/total-detection-chart';
import { DetectionImage } from '@/components/detection-image';
import Mapbox from '@/components/mapbox';
import { usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import MapboxComponent from '@/components/mapbox';
import { useState } from 'react';
import { DetectionDevice } from '@/components/detection-device';
import { TrackingDevice } from '@/components/tracking-device';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export interface Tracker {
    timestamp: string,
    longitude: string,
    latitude:string,
    distance:string,
    zone:string
}

type PageProps = {
  tracker: Tracker[]; // array of trackers
};

export default function Dashboard() {
    const { props } = usePage<PageProps>();
     const [markers, setMarkers] = useState([
        {
        coordinates: [103.08202365213722, 1.8575466636735622],
        color: '#FF0000',
        popup: '<h3>Detection Location 1</h3><p>Latest detection point</p>'
        },
        {
        coordinates: [103.08302365213722, 1.8585466636735622],
        color: '#0000FF',
        popup: '<h3>Detection Location 2</h3><p>Second detection point</p>'
        },
        {
        coordinates: [103.08102365213722, 1.8565466636735622],
        color: '#800080',
        popup: '<h3>Detection Location 3</h3><p>Third detection point</p>'
        }
    ]);

    const handleMapLoaded = (map) => {
        console.log('Peta dah load!', map);
    };

    const handleMarkerClick = (markerData) => {
        console.log('Marker diklik:', markerData);
    };

    const { tracker } = props;
    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Dashboard" />
            <h1 className="text-lg font-bold m-4">Dashboard</h1>
            <div className="w-full grid grid-cols-3 gap-4 mx-4">
                <TotalDetectionChart/>
                <DetectionImage/>
                {/* <TotalDetectionChart/> */}
                <MapboxComponent
                    accessToken="pk.eyJ1IjoiYW1hcnNheiIsImEiOiJjbWdiMzljcDEwZDJtMnBwazU0N29oeDF6In0.STcvu9bAbkxnFWtglzjpiw"
                    center={[103.08202365213722, 1.8575466636735622]}
                    zoom={13}
                    markers={markers}
                    onMapLoaded={handleMapLoaded}
                    onMarkerClick={handleMarkerClick}
                />
            </div>
            <div className="w-full grid grid-cols-3 gap-4 m-4">
                <TotalDetectionChart/>
                <DetectionDevice/>
                {/* <TotalDetectionChart/> */}
                <TrackingDevice/>
            </div>

        </AppLayout>
    );
}

import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from '@/components/ui/card';
// import { DetectionImage } from '@/components/detection-image';
import { DetectionImage } from '@/components/detection-image';

const datas = [
    {
        id: 1,
        latitude: 123412.12302021,
        longitude: 942.1239299212,
        date: '12 June 2003',
        time: '12.20 p.m',
        status: 'Active',
    },
    {
        id: 1,
        latitude: 123412.12302021,
        longitude: 942.1239299212,
        date: '12 June 2003',
        time: '12.20 p.m',
        status: 'Active',
    },
    {
        id: 1,
        latitude: 123412.12302021,
        longitude: 942.1239299212,
        date: '12 June 2003',
        time: '12.20 p.m',
        status: 'Active',
    },
    {
        id: 1,
        latitude: 123412.12302021,
        longitude: 942.1239299212,
        date: '12 June 2003',
        time: '12.20 p.m',
        status: 'Active',
    },
]


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Visualization',
        href: '/data-visualization',
    },
];
export default function TableDemo() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Data Visualization" />
        <h1 className="text-lg font-bold m-4">Data Visualization</h1>
        <div className="w-full">
            <Card>
                <Table>            
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Latitude</TableHead>
                            <TableHead>Longitude</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {datas.map((data) => (
                        <TableRow key={data.id}>
                            <TableCell className="font-medium">{data.id}</TableCell>
                            <TableCell className="font-medium">{data.latitude}</TableCell>
                            <TableCell className="font-medium">{data.longitude}</TableCell>
                            <TableCell className="font-medium">{data.date}</TableCell>
                            <TableCell className="font-medium">{data.time}</TableCell>
                            <TableCell className="text-right">{data.status}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </Card>
        </div>

    </AppLayout>
  )
}

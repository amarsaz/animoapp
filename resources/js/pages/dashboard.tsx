import AppLayout from '@/layouts/app-layout';
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { props } = usePage();

    const { tracker } = props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <Card className="m-8">
                <CardHeader>
                    <CardTitle>Tracker List</CardTitle>
                    <CardDescription>List of tracker table</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>List of tracker</TableCaption>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">Timestamp</TableHead>
                            <TableHead>Longitude</TableHead>
                            <TableHead>Latitude</TableHead>
                            <TableHead>Distance</TableHead>
                            <TableHead>Zone</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tracker.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{item.timestamp}</TableCell>
                                    <TableCell>{item.longitude}</TableCell>
                                    <TableCell>{item.latitude}</TableCell>
                                    <TableCell>{item.distance}</TableCell>
                                    <TableCell className="text-;eft">{item.zone}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                {/* <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
            </Card>
                
            
            
        </AppLayout>
    );
}

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

export default function Schedule() {
    const { props } = usePage();

    const { tracker } = props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Schedule List" />

            <Card className="m-8">
                <CardHeader>
                    <CardTitle>Schedule List</CardTitle>
                    <CardDescription>List of schedule table</CardDescription>
                </CardHeader>
                <CardContent>
                    //
                    
                </CardContent>
                {/* <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
            </Card>
                
            
            
        </AppLayout>
    );
}

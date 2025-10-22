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
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Heart, Tag, Leaf, Skull, Shield } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function InfoDetail() {
  return (
    <AppLayout>
      <Head title="Malayan Tiger Info" />
      
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-5xl font-bold mb-2">MALAYAN TIGER</h1>
                <p className="text-xl text-gray-600 italic mb-4">Panthera Tigris Jacksoni</p>
                <Badge className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 text-base">
                  Critically Endangered
                </Badge>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-purple-400 border-0">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Users className="h-6 w-6 text-black mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Wild Population</h3>
                        <p className="text-sm">Less than 200 tigers</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-400 border-0">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Heart className="h-6 w-6 text-black mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Lifespan</h3>
                        <p className="text-sm">15-20 years in wild</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Physical Characteristics */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-5 w-5" />
                  <h2 className="text-2xl font-semibold">Physical Characteristics</h2>
                </div>
                <div className="space-y-3">
                  <Card className="bg-gray-200 border-0 shadow-md">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1">Habitat</h3>
                      <p className="text-sm">Tropical rainforests of Peninsular Malaysia</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-200 border-0 shadow-md">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1">Length</h3>
                      <p className="text-sm">2.3-2.6 meters</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-200 border-0 shadow-md">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1">Diet</h3>
                      <p className="text-sm">Wild boar, deer, tapir, fish</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Habitat & Biology */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Leaf className="h-5 w-5" />
                  <h2 className="text-2xl font-semibold">Habitat & Biology</h2>
                </div>
                <div className="space-y-3">
                  <Card className="bg-gray-200 border-0 shadow-md">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1">Habitat</h3>
                      <p className="text-sm">Tropical rainforests of Peninsular Malaysia</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-200 border-0 shadow-md">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1">Reproduction</h3>
                      <p className="text-sm">2-4 cubs per litter, 3.5 years gestation</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Main Threats */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Skull className="h-5 w-5" />
                  <h2 className="text-2xl font-semibold">Main Threats</h2>
                </div>
                <div className="space-y-3">
                  <Card className="bg-gray-200 border-0 shadow-md">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium">Habitat loss and fragmentation</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-200 border-0 shadow-md">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium">Poaching for body parts</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-200 border-0 shadow-md">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium">Prey depletion</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Conservation Efforts */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5" />
                  <h2 className="text-2xl font-semibold">Conservation Efforts</h2>
                </div>
                <div className="space-y-3">
                  <Card className="bg-gray-200 border-0 shadow-md">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium">Anti-poaching patrols</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-200 border-0 shadow-md">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium">Community engagement</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-200 border-0 shadow-md">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium">Protected area establishment</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Right Column - Images */}
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1669021820343-4afcbb7fb3c8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Malayan Tiger Close-up"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1723036123278-48b332ad8030?q=80&w=3134&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Malayan Tiger Full Body"
                  className="w-full h-[300px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
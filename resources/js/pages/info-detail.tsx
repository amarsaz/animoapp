import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, TrendingDown, Eye, Users, AlertTriangle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Species Information',
    href: '/info-detail',
  },
];

const animalData = [
  {
    id: 1,
    slug: 'malayan-tiger',
    name: 'Malayan Tiger',
    scientificName: '',
    status: 'Critically Endangered',
    statusColor: 'destructive',
    population: 'Less than 200',
    location: 'Peninsular Malaysia',
    image: 'https://images.unsplash.com/photo-1669021820343-4afcbb7fb3c8?q=80&w=1287&auto=format&fit=crop',
    description: 'The Malayan tiger is a tiger from a specific population of the Panthera tigris tigris subspecies that is native to Peninsular Malaysia.',
    trendIcon: TrendingDown,
    trendText: 'Population declining'
  },
  {
    id: 2,
    slug: 'asian-elephant',
    name: 'Asian Elephant',
    scientificName: '',
    status: 'Endangered',
    statusColor: 'destructive',
    population: 'Around 1,500',
    location: 'Malaysia & Borneo',
    image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=1287&auto=format&fit=crop',
    description: 'Asian elephants are smaller than African elephants and are found in forests and grasslands across Southeast Asia.',
    trendIcon: TrendingDown,
    trendText: 'Habitat loss increasing'
  },
  {
    id: 3,
    slug: 'sun-bear',
    name: 'Sun Bear',
    scientificName: '',
    status: 'Vulnerable',
    statusColor: 'secondary',
    population: 'Unknown',
    location: 'Southeast Asian Forests',
    image: 'https://malaysianwildlife.org/wp-content/uploads/2019/10/60308692_1275691565916150_285907095197319168_o.jpg',
    description: 'The sun bear is the smallest bear species, known for its distinctive golden or white chest patch.',
    trendIcon: TrendingDown,
    trendText: 'Poaching threat high'
  },
  {
    id: 4,
    slug: 'lion',
    name: 'Lion',
    scientificName: '',
    status: 'Vulnerable',
    statusColor: 'secondary',
    population: 'Around 10,000',
    location: 'Tropical Forests',
    image: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1287&auto=format&fit=crop',
    description: 'Named for the distinctive cloud-like patterns on its coat, this elusive cat is a skilled tree climber.',
    trendIcon: TrendingDown,
    trendText: 'Deforestation threat'
  },
  {
    id: 5,
    slug: 'orangutan',
    name: 'Bornean Orangutan',
    scientificName: '',
    status: 'Critically Endangered',
    statusColor: 'destructive',
    population: 'Around 104,000',
    location: 'Borneo',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Tanjung_Puting30477.jpg',
    description: 'One of our closest relatives, orangutans are highly intelligent great apes native to the rainforests of Borneo.',
    trendIcon: TrendingDown,
    trendText: 'Palm oil threat'
  }
];

export default function InfoDetail() {
  const [selectedAnimal, setSelectedAnimal] = useState<typeof animalData[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = (animal: typeof animalData[0]) => {
    setSelectedAnimal(animal);
    setIsDialogOpen(true);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Species Information" />

      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Endangered Species</h1>
          <p className="text-gray-600">Learn about critically endangered and vulnerable species in Southeast Asia</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animalData.map((animal) => (
            <Card key={animal.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={animal.statusColor as "default" | "secondary" | "destructive"}
                    className="text-xs font-semibold"
                  >
                    {animal.status}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-2xl">{animal.name}</CardTitle>
                {animal.scientificName && (
                  <CardDescription className="italic">{animal.scientificName}</CardDescription>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-3">{animal.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{animal.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <animal.trendIcon className="h-4 w-4 text-red-500" />
                    <span className="text-gray-700">{animal.trendText}</span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Est. Population</p>
                      <p className="font-semibold text-sm">{animal.population}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleViewDetails(animal)}
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Details Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedAnimal && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold">{selectedAnimal.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 mt-2">
                  <Badge variant={selectedAnimal.statusColor as "default" | "secondary" | "destructive"}>
                    {selectedAnimal.status}
                  </Badge>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Image */}
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={selectedAnimal.image}
                    alt={selectedAnimal.name}
                    className="w-full h-64 object-cover"
                  />
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-gray-700">{selectedAnimal.description}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-blue-600 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Population</p>
                          <p className="text-lg font-semibold">{selectedAnimal.population}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-green-600 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Location</p>
                          <p className="text-lg font-semibold">{selectedAnimal.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Threats */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <h3 className="text-lg font-semibold">Primary Threat</h3>
                  </div>
                  <Card className="bg-red-50 border-red-200">
                    <CardContent className="p-4">
                      <p className="text-red-900 font-medium">{selectedAnimal.trendText}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
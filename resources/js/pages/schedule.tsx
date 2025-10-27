import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Clock, TrendingUp, Activity, Moon, Sun } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Schedule',
        href: '/schedule',
    },
];

const scheduleData = [
    {
        name: "MALAYAN TIGER",
        behavior: "Hunting and territorial patrol",
        activityTag: "High Activity",
        confidence: "95% Confidence",
        peakHours: [
            { icon: Moon, time: "22:00-02:00" },
            { icon: Moon, time: "05:00-07:00" }
        ],
        seasonalPattern: "Year-round",
        activityLevel: 95,
        activityLabel: "High"
    },
    {
        name: "ASIAN ELEPHANT",
        behavior: "Foraging and social interaction",
        activityTag: "High Activity",
        confidence: "92% Confidence",
        peakHours: [
            { icon: Sun, time: "06:00-10:00" },
            { icon: Sun, time: "16:00-20:00" }
        ],
        seasonalPattern: "Dry season peak",
        activityLevel: 92,
        activityLabel: "High"
    },
    {
        name: "SUN BEAR",
        behavior: "Feeding and territory marking",
        activityTag: "Medium Activity",
        confidence: "88% Confidence",
        peakHours: [
            { icon: Sun, time: "07:00-11:00" },
            { icon: Moon, time: "18:00-21:00" }
        ],
        seasonalPattern: "Fruit season peak",
        activityLevel: 70,
        activityLabel: "Medium"
    },
    {
        name: "CLOUDED LEOPARD",
        behavior: "Nocturnal hunting",
        activityTag: "High Activity",
        confidence: "90% Confidence",
        peakHours: [
            { icon: Moon, time: "20:00-23:00" },
            { icon: Moon, time: "03:00-06:00" }
        ],
        seasonalPattern: "Year-round",
        activityLevel: 88,
        activityLabel: "High"
    }
];

export default function Schedule() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Activity Schedule" />

            <div className="p-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Activity Schedule</h1>
                    <p className="text-gray-600">Animal behavior patterns and peak activity times</p>
                </div>

                <div className="space-y-4">
                    {scheduleData.map((animal, index) => (
                        <Card key={index} className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-xl font-bold text-gray-900">
                                            {animal.name}
                                        </CardTitle>
                                        <CardDescription className="text-sm text-gray-600 mt-1">
                                            {animal.behavior}
                                        </CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-300">
                                            {animal.activityTag}
                                        </Badge>
                                        <Badge variant="outline" className="border-gray-300">
                                            {animal.confidence}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="grid grid-cols-3 gap-8">
                                    {/* Peak Activity Hours */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Clock className="h-5 w-5 text-gray-700" />
                                            <h3 className="font-semibold text-gray-900">Peak Activity Hours</h3>
                                        </div>
                                        <div className="space-y-2">
                                            {animal.peakHours.map((hour, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-gray-700">
                                                    <hour.icon className="h-4 w-4" />
                                                    <span>{hour.time}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Seasonal Pattern */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <TrendingUp className="h-5 w-5 text-gray-700" />
                                            <h3 className="font-semibold text-gray-900">Seasonal Pattern</h3>
                                        </div>
                                        <p className="text-gray-700">{animal.seasonalPattern}</p>
                                    </div>

                                    {/* Activity Level */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Activity className="h-5 w-5 text-gray-700" />
                                            <h3 className="font-semibold text-gray-900">Activity Level</h3>
                                        </div>
                                        <div className="space-y-2">
                                            <Progress value={animal.activityLevel} className="h-2" />
                                            <p className="text-sm text-gray-700 text-right">{animal.activityLabel}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}

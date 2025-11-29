import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RoverScene } from '@/components/rover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Box, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useRovers } from '@/hooks';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export const Vehicles = () => {
    const { rovers, isConnecting } = useRovers();
    const [selectedRoverId, setSelectedRoverId] = useState<string>(rovers[0]?.id || '');

    const selectedRover = rovers.find(r => r.id === selectedRoverId) || rovers[0];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Mars Vehicles</h1>
                <p className="text-muted-foreground">
                    Monitor and control deployed surface vehicles
                </p>
            </div>

            {/* Rover Selection */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {rovers.map((rover) => (
                    <Card
                        key={rover.id}
                        className={cn(
                            "cursor-pointer transition-all hover:border-primary",
                            selectedRoverId === rover.id ? "border-primary bg-primary/5" : ""
                        )}
                        onClick={() => setSelectedRoverId(rover.id)}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {rover.name}
                            </CardTitle>
                            {rover.status === 'active' ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                                <AlertTriangle className="h-4 w-4 text-destructive animate-pulse" />
                            )}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{rover.batteryLevel}%</div>
                            <p className="text-xs text-muted-foreground">
                                Battery Level
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="standard" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="standard" className="flex items-center gap-2">
                        <Box className="h-4 w-4" />
                        Standard Model
                    </TabsTrigger>
                    <TabsTrigger value="real" className="flex items-center gap-2">
                        <Rocket className="h-4 w-4" />
                        High Fidelity Model
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="standard" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Standard Visualization: {selectedRover.name}</CardTitle>
                            <CardDescription>
                                Optimized low-poly representation for performance and clarity.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="p-6 pt-0">
                                <RoverScene mode="standard" rover={selectedRover} isConnecting={isConnecting} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="real" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>High Fidelity Visualization: {selectedRover.name}</CardTitle>
                            <CardDescription>
                                Detailed 3D model of the Curiosity Rover. Requires external assets.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="p-6 pt-0">
                                <RoverScene mode="real" rover={selectedRover} isConnecting={isConnecting} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

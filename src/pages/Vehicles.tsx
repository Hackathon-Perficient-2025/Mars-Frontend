import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RoverScene } from '@/components/rover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Box } from 'lucide-react';

export const Vehicles = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Mars Vehicles</h1>
                <p className="text-muted-foreground">
                    Monitor and control deployed surface vehicles
                </p>
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
                            <CardTitle>Standard Visualization</CardTitle>
                            <CardDescription>
                                Optimized low-poly representation for performance and clarity.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="p-6 pt-0">
                                <RoverScene mode="standard" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="real" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>High Fidelity Visualization</CardTitle>
                            <CardDescription>
                                Detailed 3D model of the Curiosity Rover. Requires external assets.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="p-6 pt-0">
                                <RoverScene mode="real" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

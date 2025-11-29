import { useState, useEffect, useCallback } from 'react';
import type { RoverStatus } from '@/types/rover.types';
import { MOCK_ROVERS } from '@/mocks/rover.mock';

export const useRovers = () => {
    const [rovers, setRovers] = useState<RoverStatus[]>(MOCK_ROVERS);
    const [isConnecting, setIsConnecting] = useState(false);

    const updateRoversData = useCallback(() => {
        setRovers((prevRovers) => {
            return prevRovers.map(rover => {
                // Different simulation logic based on status
                if (rover.status === 'error') {
                    // Critical rover gets worse or stays bad
                    return {
                        ...rover,
                        temperature: Math.min(120, rover.temperature + (Math.random() * 0.5)),
                        batteryLevel: Math.max(0, Number((rover.batteryLevel - 0.005).toFixed(2))),
                        lastCommunication: new Date(rover.lastCommunication.getTime()), // No new comms
                    };
                }

                // Healthy rover simulation
                const speedChange = Math.random() > 0.7 ? (Math.random() - 0.5) * 0.5 : 0;
                const newSpeed = Math.max(0, Math.min(5, rover.speed + speedChange));

                const tempChange = (Math.random() - 0.5) * 0.2;
                const batteryDrain = rover.speed > 0 ? 0.01 : 0.001;

                return {
                    ...rover,
                    speed: Number(newSpeed.toFixed(2)),
                    temperature: Number((rover.temperature + tempChange).toFixed(1)),
                    batteryLevel: Math.max(0, Number((rover.batteryLevel - batteryDrain).toFixed(2))),
                    lastCommunication: new Date(),
                    wheels: rover.speed > 0 && Math.random() > 0.95 ? {
                        ...rover.wheels,
                        [Object.keys(rover.wheels)[Math.floor(Math.random() * 6)]]: Math.max(0, Object.values(rover.wheels)[Math.floor(Math.random() * 6)] - 0.1)
                    } : rover.wheels
                };
            });
        });
    }, []);

    useEffect(() => {
        setIsConnecting(true);
        const timeout = setTimeout(() => {
            setIsConnecting(false);
        }, 1000);

        const interval = setInterval(updateRoversData, 2000);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [updateRoversData]);

    return {
        rovers,
        isConnecting,
    };
};

import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { AlertCircle } from 'lucide-react';

interface RealRoverModelProps {
    onPartClick: (part: string) => void;
}

export const RealRoverModel = ({ onPartClick }: RealRoverModelProps) => {
    // status is available if we want to animate based on it later
    try {
        const { scene } = useGLTF('/models/rover.glb', true); // true = useDraco
        const modelRef = useRef<THREE.Group>(null);

        return (
            <primitive
                ref={modelRef}
                object={scene}
                scale={1.5}
                position={[0, 0, 0]}
                onClick={(e: any) => {
                    e.stopPropagation();
                    onPartClick(e.object.name || 'Unknown Part');
                }}
            />
        );
    } catch (e) {
        // Fallback if model load fails
        return (
            <Html center>
                <div className="bg-destructive/90 text-destructive-foreground p-4 rounded-lg shadow-lg max-w-sm text-center backdrop-blur-sm border border-destructive/50">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                    <h3 className="font-bold text-lg">Model Not Found</h3>
                    <p className="text-sm mt-2">
                        Please place a 3D model file named <code>rover.glb</code> in the
                        <code>public/models/</code> directory.
                    </p>
                </div>
            </Html>
        );
    }
};

// Preload to avoid suspense on first render if possible, but we handle error above
useGLTF.preload('/models/rover.glb');

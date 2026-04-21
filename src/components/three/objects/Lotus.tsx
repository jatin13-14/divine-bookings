import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LotusProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  rotate?: boolean;
}

export function Lotus({ position = [0, 0, 0], scale = 1, color = "#f06a8b", rotate = true }: LotusProps) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (rotate && group.current) group.current.rotation.y += dt * 0.25;
  });

  const petalLayers = [
    { count: 8, radius: 0.55, tilt: 0.2, scale: 1, color: color },
    { count: 8, radius: 0.45, tilt: 0.45, scale: 0.85, color: "#f48aa3" },
    { count: 6, radius: 0.32, tilt: 0.7, scale: 0.7, color: "#f9b3c2" },
  ];

  return (
    <group ref={group} position={position} scale={scale}>
      {petalLayers.map((layer, li) => (
        <group key={li} rotation={[0, (li * Math.PI) / 8, 0]}>
          {Array.from({ length: layer.count }).map((_, i) => {
            const a = (i / layer.count) * Math.PI * 2;
            return (
              <mesh
                key={i}
                position={[Math.cos(a) * layer.radius * 0.4, li * 0.05, Math.sin(a) * layer.radius * 0.4]}
                rotation={[layer.tilt, -a + Math.PI / 2, 0]}
                scale={[layer.scale * 0.5, layer.scale * 0.9, layer.scale * 0.2]}
                castShadow
              >
                <sphereGeometry args={[0.5, 12, 12]} />
                <meshStandardMaterial color={layer.color} roughness={0.55} />
              </mesh>
            );
          })}
        </group>
      ))}
      {/* Center pollen */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#f0b020" emissive="#aa6a08" emissiveIntensity={0.3} roughness={0.5} />
      </mesh>
    </group>
  );
}

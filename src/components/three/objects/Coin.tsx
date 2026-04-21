import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Coin({
  position = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 1.4;
  });
  return (
    <mesh ref={ref} position={position} scale={scale} castShadow>
      <cylinderGeometry args={[0.5, 0.5, 0.08, 32]} />
      <meshStandardMaterial color="#f0b820" metalness={0.9} roughness={0.15} emissive="#aa6a08" emissiveIntensity={0.15} />
    </mesh>
  );
}

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DiyaProps {
  position?: [number, number, number];
  scale?: number;
  flameIntensity?: number;
}

/** Oil lamp (diya) with animated flame and point-light glow. */
export function Diya({ position = [0, 0, 0], scale = 1, flameIntensity = 1.4 }: DiyaProps) {
  const flame = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (flame.current) {
      const f = 1 + Math.sin(t * 9) * 0.08 + Math.sin(t * 13.3) * 0.05;
      flame.current.scale.set(f * 0.9, f, f * 0.9);
      flame.current.rotation.z = Math.sin(t * 4) * 0.08;
    }
    if (light.current) {
      light.current.intensity = flameIntensity + Math.sin(t * 11) * 0.3;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Bowl */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[0.32, 0.13, 16, 32]} />
        <meshStandardMaterial color="#9a4416" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[0, -0.03, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.22, 0.15, 24]} />
        <meshStandardMaterial color="#7a3411" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Oil */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.27, 0.27, 0.02, 24]} />
        <meshStandardMaterial color="#f0b85a" emissive="#f0a040" emissiveIntensity={0.3} roughness={0.3} />
      </mesh>
      {/* Wick */}
      <mesh position={[0.22, 0.1, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.015, 0.015, 0.12, 8]} />
        <meshStandardMaterial color="#2b1a0a" />
      </mesh>
      {/* Flame */}
      <mesh ref={flame} position={[0.22, 0.28, 0]}>
        <coneGeometry args={[0.07, 0.28, 16]} />
        <meshStandardMaterial
          color="#ffcf66"
          emissive="#ff8a1f"
          emissiveIntensity={2.2}
          transparent
          opacity={0.95}
          toneMapped={false}
        />
      </mesh>
      {/* Outer glow */}
      <mesh position={[0.22, 0.28, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color="#ffb366" transparent opacity={0.18} toneMapped={false} />
      </mesh>
      <pointLight ref={light} position={[0.22, 0.35, 0]} color="#ffb060" intensity={flameIntensity} distance={4} decay={2} />
    </group>
  );
}

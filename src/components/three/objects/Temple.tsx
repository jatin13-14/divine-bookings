import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TempleProps {
  position?: [number, number, number];
  scale?: number;
  rotate?: boolean;
  color?: string;
  domeColor?: string;
}

/**
 * Procedural Hindu temple (shikhara style) built from primitives.
 * No external models — fully tree-shakeable.
 */
export function Temple({
  position = [0, 0, 0],
  scale = 1,
  rotate = true,
  color = "#d97a2c",
  domeColor = "#f0b950",
}: TempleProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (rotate && group.current) group.current.rotation.y += dt * 0.18;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Base platform */}
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.3, 3.2]} />
        <meshStandardMaterial color="#b9651f" roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.15, 2.8]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>

      {/* Main mandapa (hall) */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 1, 2.2]} />
        <meshStandardMaterial color={color} roughness={0.55} />
      </mesh>

      {/* Pillars at corners */}
      {[
        [-0.95, 0.7, 0.95],
        [0.95, 0.7, 0.95],
        [-0.95, 0.7, -0.95],
        [0.95, 0.7, -0.95],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.12, 0.14, 1.05, 16]} />
          <meshStandardMaterial color="#e89752" roughness={0.4} />
        </mesh>
      ))}

      {/* Door opening (front) */}
      <mesh position={[0, 0.5, 1.105]}>
        <boxGeometry args={[0.55, 0.85, 0.05]} />
        <meshStandardMaterial color="#3a1f0e" roughness={0.9} />
      </mesh>

      {/* Vimana — stepped pyramid (shikhara) */}
      {Array.from({ length: 6 }).map((_, i) => {
        const s = 1.9 - i * 0.27;
        const y = 1.25 + i * 0.32;
        return (
          <mesh key={i} position={[0, y, 0]} castShadow>
            <boxGeometry args={[s, 0.28, s]} />
            <meshStandardMaterial color={color} roughness={0.55} />
          </mesh>
        );
      })}

      {/* Golden dome (kalasha base) */}
      <mesh position={[0, 3.1, 0]} castShadow>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshStandardMaterial color={domeColor} roughness={0.25} metalness={0.7} />
      </mesh>

      {/* Kalasha spire */}
      <mesh position={[0, 3.55, 0]} castShadow>
        <coneGeometry args={[0.12, 0.5, 16]} />
        <meshStandardMaterial color={domeColor} roughness={0.2} metalness={0.85} emissive="#aa6a10" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 3.85, 0]} castShadow>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color={domeColor} metalness={0.9} roughness={0.15} emissive="#bf7a13" emissiveIntensity={0.3} />
      </mesh>

      {/* Side small shikharas */}
      {[-1.4, 1.4].map((x, i) => (
        <group key={i} position={[x, 0.5, 0]}>
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[0.55, 0.8, 0.55]} />
            <meshStandardMaterial color={color} roughness={0.55} />
          </mesh>
          <mesh position={[0, 1, 0]} castShadow>
            <coneGeometry args={[0.32, 0.7, 6]} />
            <meshStandardMaterial color={color} roughness={0.5} />
          </mesh>
          <mesh position={[0, 1.45, 0]} castShadow>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color={domeColor} metalness={0.85} roughness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

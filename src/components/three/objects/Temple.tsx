import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TempleProps {
  position?: [number, number, number];
  scale?: number;
  rotate?: boolean;
}

/**
 * Procedural Hindu temple — chrome/iridescent stone with warm saffron edges.
 * Active Theory aesthetic: dark metallic with rim glow.
 */
export function Temple({
  position = [0, 0, 0],
  scale = 1,
  rotate = true,
}: TempleProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (rotate && group.current) group.current.rotation.y += dt * 0.18;
  });

  // Iridescent stone material props
  const stone = {
    color: "#1a1f2e" as const,
    metalness: 0.85,
    roughness: 0.32,
    envMapIntensity: 1.4,
  };

  const accent = {
    color: "#2a2438" as const,
    metalness: 0.9,
    roughness: 0.22,
    emissive: "#3a1f0a" as const,
    emissiveIntensity: 0.25,
  };

  const gold = {
    color: "#ffb84d" as const,
    metalness: 0.95,
    roughness: 0.15,
    emissive: "#ff8a1f" as const,
    emissiveIntensity: 0.55,
  };

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Base platform */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[3.2, 0.3, 3.2]} />
        <meshStandardMaterial {...stone} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[2.8, 0.15, 2.8]} />
        <meshStandardMaterial {...accent} />
      </mesh>

      {/* Main mandapa */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[2.2, 1, 2.2]} />
        <meshStandardMaterial {...stone} />
      </mesh>

      {/* Pillars at corners with iridescent glow */}
      {[
        [-0.95, 0.7, 0.95],
        [0.95, 0.7, 0.95],
        [-0.95, 0.7, -0.95],
        [0.95, 0.7, -0.95],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <cylinderGeometry args={[0.12, 0.14, 1.05, 16]} />
          <meshStandardMaterial color="#3a4458" metalness={0.9} roughness={0.25} emissive="#1a3050" emissiveIntensity={0.4} />
        </mesh>
      ))}

      {/* Doorway with warm glow inside */}
      <mesh position={[0, 0.5, 1.105]}>
        <boxGeometry args={[0.55, 0.85, 0.05]} />
        <meshStandardMaterial color="#1a0a04" emissive="#ff7a1f" emissiveIntensity={1.1} toneMapped={false} />
      </mesh>

      {/* Stepped shikhara */}
      {Array.from({ length: 6 }).map((_, i) => {
        const s = 1.9 - i * 0.27;
        const y = 1.25 + i * 0.32;
        return (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[s, 0.28, s]} />
            <meshStandardMaterial {...stone} />
          </mesh>
        );
      })}

      {/* Dome */}
      <mesh position={[0, 3.1, 0]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial {...gold} />
      </mesh>

      {/* Kalasha spire — main glowing element */}
      <mesh position={[0, 3.55, 0]}>
        <coneGeometry args={[0.12, 0.5, 16]} />
        <meshStandardMaterial {...gold} emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[0, 3.85, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#fff0c8" emissive="#ffb84d" emissiveIntensity={2} toneMapped={false} />
      </mesh>
      {/* Glow point at the kalasha */}
      <pointLight position={[0, 3.85, 0]} color="#ffb84d" intensity={1.4} distance={5} decay={2} />

      {/* Side small shikharas */}
      {[-1.4, 1.4].map((x, i) => (
        <group key={i} position={[x, 0.5, 0]}>
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[0.55, 0.8, 0.55]} />
            <meshStandardMaterial {...stone} />
          </mesh>
          <mesh position={[0, 1, 0]}>
            <coneGeometry args={[0.32, 0.7, 6]} />
            <meshStandardMaterial {...accent} />
          </mesh>
          <mesh position={[0, 1.45, 0]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial {...gold} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

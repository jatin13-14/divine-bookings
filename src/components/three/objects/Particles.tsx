import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticlesProps {
  count?: number;
  spread?: number;
  color?: string;
  size?: number;
  speed?: number;
}

/** Drifting golden embers / flower petals — additive sprite-like points. */
export function Particles({
  count = 120,
  spread = 8,
  color = "#ffb060",
  size = 0.06,
  speed = 0.2,
}: ParticlesProps) {
  const ref = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      velocities[i * 3] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 1] = Math.random() * 0.15 + 0.05;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }
    return { positions, velocities };
  }, [count, spread]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    const geo = ref.current.geometry as THREE.BufferGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3] * speed * 60 * dt;
      arr[i * 3 + 1] += velocities[i * 3 + 1] * speed * 60 * dt;
      arr[i * 3 + 2] += velocities[i * 3 + 2] * speed * 60 * dt;
      if (arr[i * 3 + 1] > spread / 2) arr[i * 3 + 1] = -spread / 2;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

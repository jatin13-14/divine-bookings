import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticlesProps {
  count?: number;
  spread?: number;
  color?: string;
  size?: number;
  speed?: number;
  /** Active Theory style: dust drifts in all directions, not just up */
  drift?: "up" | "ambient";
}

/** Cosmic dust / drifting particles — Active Theory signature look. */
export function Particles({
  count = 200,
  spread = 12,
  color = "#7fb8ff",
  size = 0.04,
  speed = 0.12,
  drift = "ambient",
}: ParticlesProps) {
  const ref = useRef<THREE.Points>(null);

  const { positions, velocities, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      if (drift === "up") {
        velocities[i * 3] = (Math.random() - 0.5) * 0.04;
        velocities[i * 3 + 1] = Math.random() * 0.12 + 0.04;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
      } else {
        velocities[i * 3] = (Math.random() - 0.5) * 0.08;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
      }
      sizes[i] = Math.random() * 0.6 + 0.4;
    }
    return { positions, velocities, sizes };
  }, [count, spread, drift]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    const geo = ref.current.geometry as THREE.BufferGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const half = spread / 2;
    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3] * speed * 60 * dt;
      arr[i * 3 + 1] += velocities[i * 3 + 1] * speed * 60 * dt;
      arr[i * 3 + 2] += velocities[i * 3 + 2] * speed * 60 * dt;
      // wrap around when out of bounds
      if (arr[i * 3] > half) arr[i * 3] = -half;
      if (arr[i * 3] < -half) arr[i * 3] = half;
      if (arr[i * 3 + 1] > half) arr[i * 3 + 1] = -half;
      if (arr[i * 3 + 1] < -half) arr[i * 3 + 1] = half;
      if (arr[i * 3 + 2] > half) arr[i * 3 + 2] = -half;
      if (arr[i * 3 + 2] < -half) arr[i * 3 + 2] = half;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

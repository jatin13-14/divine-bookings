import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OmProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  rotate?: boolean;
}

/** Stylized "Om" symbol extruded as a 3D shape from a curve approximation. */
export function OmSymbol({ position = [0, 0, 0], scale = 1, color = "#d97a2c", rotate = true }: OmProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (rotate && group.current) group.current.rotation.y += dt * 0.4;
  });

  const torus = useMemo(() => new THREE.TorusGeometry(0.6, 0.13, 16, 64, Math.PI * 1.4), []);

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Main loop body */}
      <mesh geometry={torus} rotation={[0, 0, -0.4]} castShadow>
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} emissive={color} emissiveIntensity={0.15} />
      </mesh>
      {/* Lower curl */}
      <mesh position={[-0.25, -0.45, 0]} castShadow>
        <torusGeometry args={[0.28, 0.11, 16, 32, Math.PI]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Tail going right */}
      <mesh position={[0.45, -0.05, 0]} rotation={[0, 0, 0.6]} castShadow>
        <torusGeometry args={[0.22, 0.1, 16, 32, Math.PI * 1.1]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Top crescent */}
      <mesh position={[0.25, 0.75, 0]} rotation={[0, 0, 0.2]} castShadow>
        <torusGeometry args={[0.22, 0.06, 16, 32, Math.PI]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.25} />
      </mesh>
      {/* Bindu (dot) */}
      <mesh position={[0.25, 1.05, 0]} castShadow>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Diya } from "./Diya";

interface ThaliProps {
  position?: [number, number, number];
  scale?: number;
  rotate?: boolean;
}

/** Brass puja thali plate with diya, kumkum, rice, flowers. */
export function PujaThali({ position = [0, 0, 0], scale = 1, rotate = true }: ThaliProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (rotate && group.current) group.current.rotation.y += dt * 0.35;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Plate base */}
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={[1.1, 1.1, 0.06, 48]} />
        <meshStandardMaterial color="#d49a3d" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Plate rim */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <torusGeometry args={[1.05, 0.06, 16, 48]} />
        <meshStandardMaterial color="#b87a20" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Inner ring engraving */}
      <mesh position={[0, 0.035, 0]}>
        <torusGeometry args={[0.85, 0.015, 12, 48]} />
        <meshStandardMaterial color="#8b5a14" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Diya in center */}
      <Diya position={[0, 0.05, 0]} scale={0.7} flameIntensity={1.1} />

      {/* Kumkum mound (red) */}
      <mesh position={[-0.55, 0.1, 0.35]} castShadow>
        <sphereGeometry args={[0.13, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#b8242e" roughness={0.85} />
      </mesh>
      {/* Haldi mound (yellow) */}
      <mesh position={[0.55, 0.1, 0.35]} castShadow>
        <sphereGeometry args={[0.13, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#e8b418" roughness={0.85} />
      </mesh>
      {/* Rice mound */}
      <mesh position={[0, 0.1, -0.55]} castShadow>
        <sphereGeometry args={[0.14, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#f4ead0" roughness={0.95} />
      </mesh>

      {/* Flower petals scattered */}
      {Array.from({ length: 7 }).map((_, i) => {
        const a = (i / 7) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.78, 0.06, Math.sin(a) * 0.78]}
            rotation={[-Math.PI / 2, 0, a]}
            castShadow
          >
            <sphereGeometry args={[0.07, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#e84a3c" : "#ffb133"} roughness={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}

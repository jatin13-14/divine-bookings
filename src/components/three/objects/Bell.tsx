import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Bell({
  position = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.6) * 0.18;
    }
  });
  return (
    <group ref={group} position={position} scale={scale}>
      {/* Rope */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
        <meshStandardMaterial color="#7a4a18" roughness={0.9} />
      </mesh>
      {/* Bell body */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <coneGeometry args={[0.4, 0.7, 24, 1, true]} />
        <meshStandardMaterial color="#d4a338" metalness={0.85} roughness={0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color="#c69225" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Clapper */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#8a5a18" metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  );
}

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OmProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  rotate?: boolean;
}

/** Iridescent chrome Om symbol — Active Theory metallic look. */
export function OmSymbol({
  position = [0, 0, 0],
  scale = 1,
  color = "#ffb84d",
  rotate = true,
}: OmProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (rotate && group.current) group.current.rotation.y += dt * 0.4;
  });

  const torus = useMemo(() => new THREE.TorusGeometry(0.6, 0.13, 24, 64, Math.PI * 1.4), []);

  const matProps = {
    color,
    metalness: 0.95,
    roughness: 0.18,
    emissive: color,
    emissiveIntensity: 0.45,
  };

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh geometry={torus} rotation={[0, 0, -0.4]}>
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh position={[-0.25, -0.45, 0]}>
        <torusGeometry args={[0.28, 0.11, 24, 32, Math.PI]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh position={[0.45, -0.05, 0]} rotation={[0, 0, 0.6]}>
        <torusGeometry args={[0.22, 0.1, 24, 32, Math.PI * 1.1]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh position={[0.25, 0.75, 0]} rotation={[0, 0, 0.2]}>
        <torusGeometry args={[0.22, 0.06, 16, 32, Math.PI]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh position={[0.25, 1.05, 0]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color="#fff0c8" emissive={color} emissiveIntensity={1.5} toneMapped={false} />
      </mesh>
    </group>
  );
}

import { Float } from "@react-three/drei";
import { Scene } from "./Scene";
import { Temple } from "./objects/Temple";
import { Diya } from "./objects/Diya";
import { OmSymbol } from "./objects/OmSymbol";
import { Lotus } from "./objects/Lotus";
import { Particles } from "./objects/Particles";

/** Big immersive hero scene — temple at center, diyas, om, embers. */
export function HeroScene() {
  return (
    <Scene cameraPosition={[0, 2, 8]} fov={42} dpr={[1, 2]}>
      {/* Ground reflection plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
        <circleGeometry args={[10, 64]} />
        <meshStandardMaterial color="#2a1408" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Subtle fog for depth */}
      <fog attach="fog" args={["#1a0a04", 8, 22]} />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
        <Temple position={[0, -0.4, 0]} scale={0.95} />
      </Float>

      {/* Side diyas */}
      <Float speed={2} floatIntensity={0.4}>
        <Diya position={[-3.2, 0.4, 1.5]} scale={1.1} />
      </Float>
      <Float speed={2.3} floatIntensity={0.4}>
        <Diya position={[3.2, 0.4, 1.5]} scale={1.1} />
      </Float>
      <Float speed={1.8} floatIntensity={0.5}>
        <Diya position={[-1.8, 1.6, 3]} scale={0.7} />
      </Float>
      <Float speed={1.6} floatIntensity={0.5}>
        <Diya position={[2, 1.7, 3]} scale={0.7} />
      </Float>

      {/* Floating om and lotus */}
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
        <OmSymbol position={[-4, 2.4, -1]} scale={0.7} color="#f0b950" />
      </Float>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <Lotus position={[4, 2.2, -1]} scale={0.9} />
      </Float>

      <Particles count={150} spread={12} color="#ffc080" size={0.05} speed={0.15} />
    </Scene>
  );
}

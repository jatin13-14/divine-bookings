import { Float } from "@react-three/drei";
import { Scene } from "./Scene";
import { Temple } from "./objects/Temple";
import { Diya } from "./objects/Diya";
import { OmSymbol } from "./objects/OmSymbol";
import { Lotus } from "./objects/Lotus";
import { Particles } from "./objects/Particles";

/** Cinematic Active Theory style hero — temple at center, drifting cosmic dust, iridescent rim. */
export function HeroScene() {
  return (
    <Scene cameraPosition={[0, 2, 8]} fov={42} dpr={[1, 2]}>
      {/* Reflective dark ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
        <circleGeometry args={[14, 64]} />
        <meshStandardMaterial color="#06080f" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Deep cosmic fog */}
      <fog attach="fog" args={["#04060d", 7, 24]} />

      <Float speed={1.0} rotationIntensity={0.15} floatIntensity={0.35}>
        <Temple position={[0, -0.4, 0]} scale={0.95} />
      </Float>

      {/* Glowing diyas at base */}
      <Float speed={2} floatIntensity={0.3}>
        <Diya position={[-3.2, 0.4, 1.5]} scale={1.1} />
      </Float>
      <Float speed={2.3} floatIntensity={0.3}>
        <Diya position={[3.2, 0.4, 1.5]} scale={1.1} />
      </Float>
      <Float speed={1.8} floatIntensity={0.4}>
        <Diya position={[-1.8, 1.6, 3]} scale={0.7} />
      </Float>
      <Float speed={1.6} floatIntensity={0.4}>
        <Diya position={[2, 1.7, 3]} scale={0.7} />
      </Float>

      {/* Floating chrome om and lotus */}
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
        <OmSymbol position={[-4.2, 2.6, -1.5]} scale={0.7} color="#ffb84d" />
      </Float>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <Lotus position={[4.2, 2.4, -1.5]} scale={0.9} />
      </Float>

      {/* Two layered particle systems for cosmic depth */}
      <Particles count={220} spread={16} color="#7fb8ff" size={0.035} speed={0.08} />
      <Particles count={120} spread={10} color="#ffb060" size={0.045} speed={0.18} drift="up" />
    </Scene>
  );
}

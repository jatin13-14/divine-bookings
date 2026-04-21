import { Float } from "@react-three/drei";
import { Scene } from "./Scene";
import { PujaThali } from "./objects/PujaThali";
import { Particles } from "./objects/Particles";

/** Compact 3D scene used inside puja cards. */
export function PujaScene({ interactive = false }: { interactive?: boolean }) {
  return (
    <Scene cameraPosition={[0, 1.6, 3.4]} fov={40} dpr={[1, 1.5]}>
      <color attach="background" args={["#06080f"]} />
      <fog attach="fog" args={["#06080f", 4, 8]} />
      <Float speed={1.4} floatIntensity={0.4} rotationIntensity={interactive ? 0.6 : 0.2}>
        <PujaThali position={[0, -0.2, 0]} scale={1.1} rotate />
      </Float>
      <Particles count={70} spread={5} color="#7fb8ff" size={0.035} speed={0.12} />
      <Particles count={40} spread={4} color="#ffb060" size={0.04} speed={0.15} drift="up" />
    </Scene>
  );
}

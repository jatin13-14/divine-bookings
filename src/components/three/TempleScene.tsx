import { Float } from "@react-three/drei";
import { Scene } from "./Scene";
import { Temple } from "./objects/Temple";
import { Diya } from "./objects/Diya";
import { Particles } from "./objects/Particles";

/** Compact 3D scene used inside temple cards. */
export function TempleScene() {
  return (
    <Scene cameraPosition={[0, 2, 7]} fov={38} dpr={[1, 1.5]}>
      <color attach="background" args={["#06080f"]} />
      <fog attach="fog" args={["#06080f", 6, 18]} />
      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.2}>
        <Temple position={[0, -0.6, 0]} scale={0.95} />
      </Float>
      <Diya position={[-2, 0.1, 1.8]} scale={0.9} />
      <Diya position={[2, 0.1, 1.8]} scale={0.9} />
      <Particles count={60} spread={7} color="#7fb8ff" size={0.03} speed={0.08} />
      <Particles count={30} spread={5} color="#ffb060" size={0.035} speed={0.12} drift="up" />
    </Scene>
  );
}

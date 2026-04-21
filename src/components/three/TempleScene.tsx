import { Float } from "@react-three/drei";
import { Scene } from "./Scene";
import { Temple } from "./objects/Temple";
import { Diya } from "./objects/Diya";
import { Particles } from "./objects/Particles";

/** Compact 3D scene used inside temple cards / detail page. */
export function TempleScene() {
  return (
    <Scene cameraPosition={[0, 2, 7]} fov={38} dpr={[1, 1.5]}>
      <color attach="background" args={["#1a0a04"]} />
      <fog attach="fog" args={["#1a0a04", 7, 16]} />
      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.2}>
        <Temple position={[0, -0.6, 0]} scale={0.95} />
      </Float>
      <Diya position={[-2, 0.1, 1.8]} scale={0.9} />
      <Diya position={[2, 0.1, 1.8]} scale={0.9} />
      <Particles count={40} spread={6} color="#ffc080" size={0.04} speed={0.12} />
    </Scene>
  );
}

import { Scene } from "./Scene";
import { Particles } from "./objects/Particles";
import { OmSymbol } from "./objects/OmSymbol";
import { Float } from "@react-three/drei";

/**
 * Fixed full-page background — drifting cosmic dust + slowly rotating
 * chrome Om symbols. Sits behind everything at low opacity.
 */
export function BackgroundScene() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(ellipse at top, hsl(222 50% 8%) 0%, hsl(222 45% 4%) 60%, hsl(222 50% 2%) 100%)",
      }}
    >
      <Scene cameraPosition={[0, 0, 8]} fov={50} ambient dpr={[1, 1.25]}>
        <Float speed={0.6} rotationIntensity={0.2} floatIntensity={0.3}>
          <OmSymbol position={[-6, 2.5, -3]} scale={0.6} color="#ffb060" />
        </Float>
        <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <OmSymbol position={[6, -2.5, -3]} scale={0.5} color="#5fc4ff" />
        </Float>
        <Particles count={180} spread={18} color="#7fb8ff" size={0.04} speed={0.07} />
        <Particles count={90} spread={14} color="#ffb060" size={0.035} speed={0.09} />
      </Scene>
    </div>
  );
}

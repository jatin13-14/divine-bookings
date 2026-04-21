import { Scene } from "./Scene";
import { Particles } from "./objects/Particles";
import { OmSymbol } from "./objects/OmSymbol";
import { Float } from "@react-three/drei";

/**
 * Full-page fixed background canvas — drifting embers + slowly rotating
 * Om symbols. Sits behind all page content with low opacity.
 */
export function BackgroundScene() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-60"
      style={{ background: "radial-gradient(ellipse at top, hsl(35 35% 96%) 0%, hsl(40 33% 97%) 70%)" }}
    >
      <Scene cameraPosition={[0, 0, 8]} fov={50} ambient dpr={[1, 1.25]}>
        <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
          <OmSymbol position={[-5, 2, -2]} scale={0.7} color="#e89752" />
        </Float>
        <Float speed={0.6} rotationIntensity={0.2} floatIntensity={0.3}>
          <OmSymbol position={[5, -2, -2]} scale={0.55} color="#f0b950" />
        </Float>
        <Particles count={90} spread={14} color="#e89752" size={0.05} speed={0.1} />
      </Scene>
    </div>
  );
}

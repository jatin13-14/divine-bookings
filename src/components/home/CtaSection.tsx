import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scene } from "@/components/three/Scene";
import { Diya } from "@/components/three/objects/Diya";
import { Particles } from "@/components/three/objects/Particles";
import { OmSymbol } from "@/components/three/objects/OmSymbol";
import { Float } from "@react-three/drei";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#04060d] py-28 md:py-36">
      {/* Background 3D */}
      <div className="absolute inset-0">
        <Scene cameraPosition={[0, 0, 6]} fov={45}>
          <fog attach="fog" args={["#04060d", 5, 14]} />
          <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
            <OmSymbol position={[0, 1.2, -1]} scale={1.5} color="#ffb84d" />
          </Float>
          <Float speed={1.4} floatIntensity={0.5}>
            <Diya position={[-3.2, -0.5, 1]} scale={1.3} />
          </Float>
          <Float speed={1.6} floatIntensity={0.5}>
            <Diya position={[3.2, -0.5, 1]} scale={1.3} />
          </Float>
          <Particles count={180} spread={12} color="#7fb8ff" size={0.04} speed={0.1} />
          <Particles count={100} spread={10} color="#ffb060" size={0.045} speed={0.16} drift="up" />
        </Scene>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,rgba(0,0,0,0.7)_100%)]" />

      <div className="relative z-10 container text-center pointer-events-none">
        <span className="label-mono-sm text-foreground/60">Index · 06 / Begin</span>
        <h2 className="mt-4 font-display text-5xl font-light leading-[0.95] text-foreground md:text-7xl lg:text-8xl text-shadow-cosmic">
          Begin your
          <br />
          <span className="text-gradient-iridescent italic">spiritual</span> journey.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base text-foreground/75 text-shadow-cosmic">
          Authentic temple pujas, performed with devotion.
          Updates, proof, and blessings — delivered with care.
        </p>
        <div className="pointer-events-auto mt-10 flex flex-wrap justify-center gap-3">
          <Button variant="hero" size="lg" asChild>
            <Link to="/pujas">Book a puja</Link>
          </Button>
          <Button variant="hero-outline" size="lg" asChild>
            <Link to="/temples">Choose a temple</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

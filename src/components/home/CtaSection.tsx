import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scene } from "@/components/three/Scene";
import { Diya } from "@/components/three/objects/Diya";
import { Particles } from "@/components/three/objects/Particles";
import { Float } from "@react-three/drei";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#1a0a04] py-20 md:py-28">
      {/* Background 3D layer */}
      <div className="absolute inset-0 opacity-90">
        <Scene cameraPosition={[0, 0, 6]} fov={45}>
          <Float speed={1.4} floatIntensity={0.5}>
            <Diya position={[-3, 0.5, 0]} scale={1.4} />
          </Float>
          <Float speed={1.6} floatIntensity={0.5}>
            <Diya position={[3, 0.5, 0]} scale={1.4} />
          </Float>
          <Float speed={1.2} floatIntensity={0.6}>
            <Diya position={[0, -1, 1]} scale={1.6} />
          </Float>
          <Particles count={120} spread={10} color="#ffc080" size={0.06} speed={0.18} />
        </Scene>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.6)_100%)]" />

      <div className="relative z-10 container text-center pointer-events-none">
        <h2
          className="font-display text-3xl font-bold text-primary-foreground md:text-5xl"
          style={{ textShadow: "0 6px 24px rgba(0,0,0,0.6), 0 2px 6px rgba(255,140,40,0.4)" }}
        >
          Begin your spiritual journey today
        </h2>
        <p
          className="mx-auto mt-3 max-w-xl text-primary-foreground/90"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.55)" }}
        >
          Book authentic temple pujas performed with devotion—get updates, proof, and blessings delivered with care.
        </p>
        <div className="pointer-events-auto mt-8 flex flex-wrap justify-center gap-3">
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

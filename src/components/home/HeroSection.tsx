import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeroScene } from "@/components/three/HeroScene";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-[#1a0a04]">
      {/* Real WebGL 3D scene */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* Vignette + bottom fade so text stays readable */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

      <div className="pointer-events-none relative z-10 container px-4 py-16">
        <div className="mx-auto max-w-4xl text-center animate-fade-in">
          <p className="pointer-events-auto mx-auto inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-black/40 px-4 py-1.5 text-xs font-medium tracking-wide text-primary-foreground/95 backdrop-blur-md shadow-[0_4px_24px_rgba(255,160,80,0.25)]">
            <span className="h-2 w-2 rounded-full bg-gold animate-diya-glow" />
            Book temple pujas in your name, from anywhere
          </p>

          <h1
            className="mt-5 font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl"
            style={{ textShadow: "0 6px 30px rgba(0,0,0,0.6), 0 2px 6px rgba(255,140,40,0.4)" }}
          >
            Divine Blessings,
            <br />
            <span className="text-gradient-saffron">Delivered to You</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-primary-foreground/90 md:text-xl" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.55)" }}>
            Choose authentic pujas performed at sacred temples across India. Get updates, video proof, and prasad delivery.
          </p>

          <div className="pointer-events-auto mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button variant="hero" size="lg" asChild>
              <Link to="/pujas">Explore Pujas</Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/temples">Explore Temples</Link>
            </Button>
          </div>

          <div className="pointer-events-auto mt-10 grid grid-cols-3 gap-3 rounded-2xl border border-primary-foreground/20 bg-black/40 p-4 text-primary-foreground/95 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md sm:gap-6 sm:p-6">
            <div className="text-center">
              <div className="font-display text-2xl font-bold sm:text-3xl">100+</div>
              <div className="mt-1 text-xs text-primary-foreground/80 sm:text-sm">Temple partners</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl font-bold sm:text-3xl">4.5★</div>
              <div className="mt-1 text-xs text-primary-foreground/80 sm:text-sm">Devotee ratings</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl font-bold sm:text-3xl">30+</div>
              <div className="mt-1 text-xs text-primary-foreground/80 sm:text-sm">Countries served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeroScene } from "@/components/three/HeroScene";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-[#04060d]">
      {/* WebGL scene */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* Cosmic vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.7)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background" />

      {/* Top + bottom microtype frame */}
      <div className="pointer-events-none absolute inset-x-0 top-24 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 text-foreground/60">
        <span className="label-mono-sm">N · 28.6° E · 77.2°</span>
        <span className="label-mono-sm">Sanātana · MMXXVI</span>
      </div>

      <div className="pointer-events-none relative z-10 container px-4 py-16">
        <div className="mx-auto max-w-5xl text-center animate-fade-in">
          <p className="pointer-events-auto mx-auto inline-flex items-center gap-2.5 rounded-full border border-foreground/15 bg-foreground/[0.04] px-4 py-1.5 backdrop-blur-md label-mono-sm text-foreground/80">
            <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
            <span>Live · Temple bookings open</span>
          </p>

          <h1 className="mt-6 font-display text-5xl font-light leading-[0.95] text-foreground md:text-7xl lg:text-[8rem] text-shadow-cosmic">
            Divine Blessings
            <br />
            <span className="text-gradient-iridescent font-medium italic">delivered</span>
            <span className="text-foreground/90"> to you.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-base text-foreground/70 md:text-lg text-shadow-cosmic">
            Authentic pujas performed at sacred temples across India.
            Updates, video proof, prasad — wherever you are.
          </p>

          <div className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button variant="hero" size="lg" asChild>
              <Link to="/pujas">Explore Pujas</Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/temples">Explore Temples</Link>
            </Button>
          </div>

          {/* Stats — minimal mono frame */}
          <div className="pointer-events-auto mt-14 mx-auto flex max-w-2xl items-center justify-between border-t border-foreground/10 pt-6 text-foreground">
            <div className="text-left">
              <div className="font-display text-3xl font-light">100+</div>
              <div className="mt-1 label-mono-sm text-foreground/60">Temple partners</div>
            </div>
            <div className="h-10 w-px bg-foreground/10" />
            <div className="text-center">
              <div className="font-display text-3xl font-light">4.5<span className="text-primary">★</span></div>
              <div className="mt-1 label-mono-sm text-foreground/60">Devotee rating</div>
            </div>
            <div className="h-10 w-px bg-foreground/10" />
            <div className="text-right">
              <div className="font-display text-3xl font-light">30+</div>
              <div className="mt-1 label-mono-sm text-foreground/60">Countries served</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/50">
        <span className="label-mono-sm">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-foreground/40 to-transparent" />
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-temple.jpg";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="Sacred temple at golden hour with glowing diyas"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />

      <div className="relative z-10 container px-4 py-16">
        <div className="mx-auto max-w-4xl text-center animate-fade-in">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-black/20 px-4 py-1.5 text-xs font-medium tracking-wide text-primary-foreground/90 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-gold animate-diya-glow" />
            Book temple pujas in your name, from anywhere
          </p>

          <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
            Divine Blessings,
            <br />
            <span className="text-gradient-saffron">Delivered to You</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-primary-foreground/85 md:text-xl">
            Choose authentic pujas performed at sacred temples across India. Get updates, video proof, and prasad delivery.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button variant="hero" size="lg" asChild>
              <Link to="/pujas">Explore Pujas</Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/temples">Explore Temples</Link>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 rounded-2xl border border-primary-foreground/15 bg-black/25 p-4 text-primary-foreground/90 shadow-warm backdrop-blur sm:gap-6 sm:p-6">
            <div className="text-center">
              <div className="font-display text-2xl font-bold sm:text-3xl">100+</div>
              <div className="mt-1 text-xs text-primary-foreground/75 sm:text-sm">Temple partners</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl font-bold sm:text-3xl">4.5★</div>
              <div className="mt-1 text-xs text-primary-foreground/75 sm:text-sm">Devotee ratings</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl font-bold sm:text-3xl">30+</div>
              <div className="mt-1 text-xs text-primary-foreground/75 sm:text-sm">Countries served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


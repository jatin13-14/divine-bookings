import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="bg-gradient-saffron py-16 md:py-20">
      <div className="container text-center">
        <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
          Begin your spiritual journey today
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
          Book authentic temple pujas performed with devotion—get updates, proof, and blessings delivered with care.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button variant="hero-outline" size="lg" asChild>
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


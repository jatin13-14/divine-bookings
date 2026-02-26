import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PujaCard from "@/components/PujaCard";
import TempleCard from "@/components/TempleCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-temple.jpg";
import { Shield, Video, Truck, Star } from "lucide-react";

const trustItems = [
  { icon: Shield, title: "Verified Temples", desc: "Every temple partner is personally verified" },
  { icon: Video, title: "Video Proof", desc: "Receive video of your puja being performed" },
  { icon: Truck, title: "Prasad Delivery", desc: "Sacred prasad delivered to your doorstep" },
  { icon: Star, title: "Authentic Rituals", desc: "Performed by experienced temple priests" },
];

const howItWorks = [
  { step: "1", title: "Choose a Puja", desc: "Browse our collection of sacred pujas and select the one that resonates with your intent." },
  { step: "2", title: "Enter Sankalp Details", desc: "Provide your name, gotra, nakshatra, and sankalp message for the ceremony." },
  { step: "3", title: "Complete Payment", desc: "Securely pay online. Your booking is confirmed instantly." },
  { step: "4", title: "Receive Blessings", desc: "Get video proof, prasad delivery, and divine blessings from the temple." },
];

export default function Index() {
  const { data: featuredPujas } = useQuery({
    queryKey: ["featured-pujas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pujas")
        .select("*, temples(*)")
        .eq("is_featured", true)
        .eq("is_active", true)
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  const { data: temples } = useQuery({
    queryKey: ["temples-home"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("temples")
        .select("*")
        .eq("is_active", true)
        .limit(4);
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
          <img
            src={heroImage}
            alt="Sacred temple at golden hour with glowing diyas"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="relative z-10 container text-center px-4 animate-fade-in">
            <h1 className="font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
              Divine Blessings,<br />Delivered to You
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80 md:text-xl">
              Book authentic Hindu pujas performed at sacred temples across India.
              Receive prasad, video proof, and divine grace — from anywhere in the world.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/pujas">Explore Pujas</Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/temples">View Temples</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Trust indicators */}
        <section className="border-b border-border bg-card py-12">
          <div className="container">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {trustItems.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Pujas */}
        {featuredPujas && featuredPujas.length > 0 && (
          <section className="py-16">
            <div className="container">
              <div className="mb-8 text-center">
                <h2 className="font-display text-3xl font-bold md:text-4xl">Featured Pujas</h2>
                <p className="mt-2 text-muted-foreground">Most sought-after ceremonies for peace, prosperity, and well-being</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredPujas.map((puja) => (
                  <PujaCard key={puja.id} puja={puja} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button variant="outline" size="lg" asChild>
                  <Link to="/pujas">View All Pujas →</Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* How it works */}
        <section className="bg-gradient-warm py-16">
          <div className="container">
            <div className="mb-10 text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">How It Works</h2>
              <p className="mt-2 text-muted-foreground">Simple steps to receive divine blessings</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-saffron font-display text-xl font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Temples */}
        {temples && temples.length > 0 && (
          <section className="py-16">
            <div className="container">
              <div className="mb-8 text-center">
                <h2 className="font-display text-3xl font-bold md:text-4xl">Our Temple Partners</h2>
                <p className="mt-2 text-muted-foreground">Sacred temples where your pujas are performed</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {temples.map((temple) => (
                  <TempleCard key={temple.id} temple={temple} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-gradient-saffron py-16">
          <div className="container text-center">
            <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
              Begin Your Spiritual Journey Today
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-primary-foreground/80">
              Experience the power of authentic temple pujas performed with devotion and delivered with care.
            </p>
            <Button variant="hero-outline" size="lg" className="mt-6" asChild>
              <Link to="/pujas">Book a Puja Now</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

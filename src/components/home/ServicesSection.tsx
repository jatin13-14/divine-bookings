import { Link } from "react-router-dom";
import { BookOpen, Calendar, Music, Sparkles, Store, Video, ArrowUpRight } from "lucide-react";
import { Card3D } from "@/components/three/Card3D";

const services = [
  { title: "Puja Seva", desc: "Personalized pujas at sacred temples", icon: Sparkles, to: "/pujas", num: "01" },
  { title: "Chadhava Seva", desc: "Sacred chadhava at partner temples", icon: Store, to: "/pujas", num: "02" },
  { title: "Daily Darshan", desc: "Live temple vibes, anytime", icon: Video, to: { pathname: "/", hash: "#special-pujas" }, num: "03" },
  { title: "Devotional Music", desc: "Aartis, bhajans, mantras", icon: Music, to: { pathname: "/", hash: "#services" }, num: "04" },
  { title: "Sacred Texts", desc: "Stories, chalisas, readings", icon: BookOpen, to: { pathname: "/", hash: "#services" }, num: "05" },
  { title: "Panchang", desc: "Festivals & auspicious timings", icon: Calendar, to: { pathname: "/", hash: "#services" }, num: "06" },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24">
      {/* Subtle cosmic grid backdrop */}
      <div className="absolute inset-0 grid-cosmic opacity-50" />

      <div className="container relative">
        <div className="mb-14 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label-mono-sm text-foreground/40">Index · 02 / Services</span>
            <h2 className="mt-3 font-display text-4xl font-light leading-tight md:text-6xl">
              One platform for your
              <br />
              <span className="text-gradient-iridescent italic">devotional</span> needs.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-foreground/60">
            From pujas to panchang — explore services
            inspired by a modern devotional life.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/40 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <Card3D key={item.title} intensity={5} glare={false}>
              <Link
                to={item.to as any}
                className="group relative flex h-full flex-col justify-between gap-10 bg-background/90 p-7 transition-colors duration-300 hover:bg-card"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="label-mono-sm text-foreground/30">{item.num}</span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-light">{item.title}</h3>
                  <p className="mt-2 text-sm text-foreground/60">{item.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 label-mono-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Explore <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
                <div className="absolute inset-x-7 bottom-0 h-px scale-x-0 bg-gradient-iridescent transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
}

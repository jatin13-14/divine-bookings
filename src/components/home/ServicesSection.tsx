import { Link } from "react-router-dom";
import { BookOpen, Calendar, Music, Sparkles, Store, Video } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  { title: "Puja Seva", desc: "Book personalized pujas performed at temples", icon: Sparkles, to: "/pujas" },
  { title: "Chadhava Seva", desc: "Offer sacred chadhava at partner temples", icon: Store, to: "/pujas" },
  { title: "Daily Darshan", desc: "Experience temple vibes, anytime", icon: Video, to: { pathname: "/", hash: "#special-pujas" } },
  { title: "Devotional Music", desc: "Aartis, bhajans, and mantras", icon: Music, to: { pathname: "/", hash: "#services" } },
  { title: "Hindu Literature", desc: "Stories, chalisas, and readings", icon: BookOpen, to: { pathname: "/", hash: "#services" } },
  { title: "Panchang", desc: "Festivals and auspicious timings", icon: Calendar, to: { pathname: "/", hash: "#services" } },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-gradient-warm py-16 md:py-20">
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">One platform for your devotional needs</h2>
          <p className="mt-2 text-muted-foreground">
            Explore services inspired by a modern devotional experience—start with pujas and temples today.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <Link
              key={item.title}
              to={item.to as any}
              className={cn(
                "group rounded-2xl border border-border bg-card p-6 shadow-card transition-all",
                "hover:-translate-y-0.5 hover:shadow-warm focus:outline-none focus:ring-2 focus:ring-ring"
              )}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                    <span className="text-sm text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                      Explore →
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-muted-foreground">
          More features (music, literature, panchang) can be wired as you expand—this section is ready for it.
        </div>
      </div>
    </section>
  );
}


import { Link } from "react-router-dom";
import { BookOpen, Calendar, Music, Sparkles, Store, Video } from "lucide-react";
import { Card3D } from "@/components/three/Card3D";

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
    <section id="services" className="relative bg-gradient-warm py-16 md:py-20">
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">One platform for your devotional needs</h2>
          <p className="mt-2 text-muted-foreground">
            Explore services inspired by a modern devotional experience—start with pujas and temples today.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <Card3D key={item.title} intensity={8}>
              <Link
                to={item.to as any}
                className="group block h-full rounded-2xl surface-3d p-6 lift-3d focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <div className="flex items-start gap-4" style={{ transform: "translateZ(30px)" }}>
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-saffron text-primary-foreground shadow-[0_10px_20px_-6px_rgba(217,122,44,0.55),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-3px_0_rgba(120,50,5,0.35)]"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                      <span className="text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Explore →
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </Link>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
}

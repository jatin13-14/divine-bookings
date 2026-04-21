import { Shield, Star, Truck, Video } from "lucide-react";
import { Card3D } from "@/components/three/Card3D";

const trustItems = [
  { icon: Shield, title: "Verified Temples", desc: "Vetted partner temples", num: "01" },
  { icon: Video, title: "Ritual Updates", desc: "Status & video proof", num: "02" },
  { icon: Truck, title: "Prasad Delivery", desc: "Sacred prasad to your door", num: "03" },
  { icon: Star, title: "Authentic Pujas", desc: "Performed by temple priests", num: "04" },
];

export function TrustStrip() {
  return (
    <section className="relative border-y border-border/40 py-16">
      <div className="container">
        <div className="mb-10 flex items-baseline justify-between">
          <span className="label-mono-sm text-foreground/40">Index · 01 / Trust</span>
          <span className="label-mono-sm text-foreground/40 hidden md:inline">Why ePuja</span>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/40 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <Card3D key={item.title} intensity={4} glare={false}>
              <div className="group relative flex h-full flex-col gap-6 bg-background/90 p-6 transition-colors duration-300 hover:bg-card">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="label-mono-sm text-foreground/30">{item.num}</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-light text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-foreground/60">{item.desc}</p>
                </div>
                {/* Hover iridescent line */}
                <div className="absolute inset-x-6 bottom-0 h-px scale-x-0 bg-gradient-iridescent transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Shield, Star, Truck, Video } from "lucide-react";
import { Card3D } from "@/components/three/Card3D";

const trustItems = [
  { icon: Shield, title: "Verified Temples", desc: "Temple partners are vetted for authentic rituals" },
  { icon: Video, title: "Ritual Updates", desc: "Stay informed with ceremony status and proof" },
  { icon: Truck, title: "Prasad Delivery", desc: "Sacred prasad delivered to your doorstep" },
  { icon: Star, title: "Authentic Pujas", desc: "Performed by experienced temple priests" },
];

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-card py-12">
      <div className="container">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <Card3D key={item.title} intensity={6} glare={false}>
              <div className="flex h-full items-start gap-4 rounded-2xl surface-3d p-5 lift-3d">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-saffron text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-2px_0_rgba(120,50,5,0.35),0_8px_18px_-6px_rgba(217,122,44,0.55)]"
                  style={{ transform: "translateZ(25px)" }}
                >
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="min-w-0" style={{ transform: "translateZ(15px)" }}>
                  <h3 className="font-display text-base font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
}

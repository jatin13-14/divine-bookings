import { Shield, Star, Truck, Video } from "lucide-react";

const trustItems = [
  { icon: Shield, title: "Verified Temples", desc: "Temple partners are vetted for authentic rituals" },
  { icon: Video, title: "Ritual Updates", desc: "Stay informed with ceremony status and proof" },
  { icon: Truck, title: "Prasad Delivery", desc: "Sacred prasad delivered to your doorstep" },
  { icon: Star, title: "Authentic Pujas", desc: "Performed by experienced temple priests" },
];

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-card py-10">
      <div className="container">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-base font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


import { Star } from "lucide-react";
import { Card3D } from "@/components/three/Card3D";

const testimonials = [
  { name: "Achutam Nair", city: "Bangalore", text: "Smooth booking and timely updates. The puja video felt very reassuring.", num: "01" },
  { name: "Ramesh Bhatt", city: "Nagpur", text: "Sankalp details captured properly and the ceremony performed sincerely.", num: "02" },
  { name: "Aparna Mal", city: "Puri", text: "Loved the temple selection and clear communication. Prasad delivery was a great touch.", num: "03" },
];

export function TestimonialsSection() {
  return (
    <section id="reviews" className="relative border-y border-border/40 py-24">
      <div className="container">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <span className="label-mono-sm text-foreground/40">Index · 04 / Reviews</span>
            <h2 className="mt-3 font-display text-4xl font-light md:text-6xl">
              <span className="text-gradient-iridescent italic">Words</span> from devotees.
            </h2>
          </div>
          <span className="label-mono-sm text-foreground/40 hidden md:inline">4.5 ★ Average</span>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card3D key={t.name} intensity={6} glare={false}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-7 backdrop-blur-md transition-all duration-500 hover:border-primary/40 hover:bg-card/70">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-primary" />
                    ))}
                  </div>
                  <span className="label-mono-sm text-foreground/30">{t.num}</span>
                </div>
                <p className="mt-6 font-display text-lg font-light italic leading-relaxed text-foreground/85">
                  “{t.text}”
                </p>
                <div className="mt-8 border-t border-border/60 pt-4">
                  <div className="font-display text-base">{t.name}</div>
                  <div className="label-mono-sm text-foreground/50 mt-1">{t.city}</div>
                </div>
                <div className="absolute inset-x-7 bottom-0 h-px scale-x-0 bg-gradient-iridescent transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
}

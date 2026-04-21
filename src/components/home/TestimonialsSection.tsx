import { Star } from "lucide-react";
import { Card3D } from "@/components/three/Card3D";

const testimonials = [
  { name: "Achutam Nair", city: "Bangalore", text: "Smooth booking experience and timely updates. The puja video felt very reassuring." },
  { name: "Ramesh Chandra Bhatt", city: "Nagpur", text: "The details for sankalp were captured properly and the ceremony was performed sincerely." },
  { name: "Aparna Mal", city: "Puri", text: "Loved the temple selection and the clear communication. Prasad delivery was a great touch." },
];

export function TestimonialsSection() {
  return (
    <section id="reviews" className="border-y border-border bg-card py-16 md:py-20">
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Reviews & ratings</h2>
          <p className="mt-2 text-muted-foreground">What devotees say about their experience</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card3D key={t.name} intensity={9}>
              <div className="h-full rounded-2xl surface-3d p-6 lift-3d">
                <div className="flex items-center gap-1 text-gold" style={{ transform: "translateZ(20px)" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold drop-shadow-[0_2px_4px_rgba(217,170,40,0.6)]" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/90" style={{ transform: "translateZ(15px)" }}>
                  “{t.text}”
                </p>
                <div className="mt-5 border-t border-border pt-4" style={{ transform: "translateZ(25px)" }}>
                  <div className="font-display font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.city}</div>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
}

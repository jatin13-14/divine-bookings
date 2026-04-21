import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, MapPin } from "lucide-react";
import { PujaScene } from "@/components/three/PujaScene";
import { demoPujas } from "@/lib/demoData";

export default function PujaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const puja = demoPujas.find((p) => p.id === id);

  if (!puja) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-32 container py-12 text-center">
          <h1 className="font-display text-3xl font-light">Puja Not Found</h1>
          <Button variant="outline" className="mt-6" asChild>
            <Link to="/pujas">Back to All Pujas</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <div className="container py-10">
          <span className="label-mono-sm text-foreground/40">Index · Puja Detail</span>
          <div className="mt-4 grid gap-10 lg:grid-cols-5">
            {/* 3D scene */}
            <div className="lg:col-span-3">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/60 bg-[#04060d]">
                <PujaScene interactive />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/10" />
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                {puja.is_featured && (
                  <span className="label-mono-sm rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-primary">
                    ★ Featured
                  </span>
                )}
                {puja.category && (
                  <span className="label-mono-sm rounded-full border border-border/60 bg-card/40 px-2.5 py-1 text-foreground/70">
                    {puja.category}
                  </span>
                )}
              </div>
              <h1 className="font-display text-4xl font-light leading-tight">{puja.name}</h1>
              <p className="mt-2 label-mono-sm text-foreground/50">{puja.deity}</p>

              {puja.temples && (
                <div className="mt-4 flex items-center gap-2 text-sm text-foreground/70">
                  <MapPin className="h-4 w-4 text-primary" />
                  <Link to={`/temples/${puja.temples.id}`} className="hover:text-primary transition-colors">
                    {puja.temples.name}, {puja.temples.location}
                  </Link>
                </div>
              )}

              {puja.duration && (
                <div className="mt-2 flex items-center gap-2 text-sm text-foreground/70">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Duration · {puja.duration}</span>
                </div>
              )}

              <div className="mt-8 rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
                <div className="flex items-baseline justify-between">
                  <span className="label-mono-sm text-foreground/50">Investment</span>
                  <span className="font-display text-4xl font-light text-primary">
                    ₹{puja.price.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="mt-1 text-right label-mono-sm text-foreground/50">per ceremony</p>
                <Button variant="hero" size="lg" className="mt-6 w-full" asChild>
                  <Link to={`/book/${puja.id}`}>Book This Puja</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Description sections */}
          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            {puja.description && (
              <div>
                <span className="label-mono-sm text-foreground/40">01 / About</span>
                <h2 className="mt-2 font-display text-2xl font-light mb-4">About this puja</h2>
                <p className="text-foreground/70 leading-relaxed whitespace-pre-line">{puja.description}</p>
              </div>
            )}
            {puja.benefits && (
              <div>
                <span className="label-mono-sm text-foreground/40">02 / Benefits</span>
                <h2 className="mt-2 font-display text-2xl font-light mb-4">Benefits</h2>
                <p className="text-foreground/70 leading-relaxed whitespace-pre-line">{puja.benefits}</p>
              </div>
            )}
            {puja.preparation_instructions && (
              <div>
                <span className="label-mono-sm text-foreground/40">03 / Prepare</span>
                <h2 className="mt-2 font-display text-2xl font-light mb-4">Preparation</h2>
                <p className="text-foreground/70 leading-relaxed whitespace-pre-line">{puja.preparation_instructions}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

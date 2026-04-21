import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PujaCard from "@/components/PujaCard";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { TempleScene } from "@/components/three/TempleScene";
import { demoPujas, demoTemples } from "@/lib/demoData";

export default function TempleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const temple = demoTemples.find((t) => t.id === id);
  const pujas = demoPujas.filter((p) => p.temples?.id === id);

  if (!temple) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-32 container py-12 text-center">
          <h1 className="font-display text-3xl font-light">Temple Not Found</h1>
          <Button variant="outline" className="mt-6" asChild>
            <Link to="/temples">Back to Temples</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Cinematic 3D hero */}
        <div className="relative h-[60vh] min-h-[420px] overflow-hidden bg-[#04060d]">
          <TempleScene />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.75)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
          <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
            <div className="container">
              <span className="label-mono-sm text-foreground/60 text-shadow-cosmic">Index · Temple</span>
              <h1 className="mt-2 font-display text-5xl font-light text-foreground md:text-7xl text-shadow-cosmic">
                {temple.name}
              </h1>
              <div className="mt-3 flex items-center gap-2 label-mono-sm text-foreground/70 text-shadow-cosmic">
                <MapPin className="h-3.5 w-3.5" />
                <span>{temple.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-16">
          {temple.description && (
            <div className="max-w-3xl mb-16">
              <span className="label-mono-sm text-foreground/40">01 / About</span>
              <h2 className="mt-2 font-display text-3xl font-light mb-4">About this temple</h2>
              <p className="text-foreground/70 leading-relaxed whitespace-pre-line">{temple.description}</p>
            </div>
          )}

          {pujas.length > 0 && (
            <div>
              <span className="label-mono-sm text-foreground/40">02 / Pujas</span>
              <h2 className="mt-2 mb-8 font-display text-3xl font-light">Available pujas</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pujas.map((puja) => <PujaCard key={puja.id} puja={puja} />)}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

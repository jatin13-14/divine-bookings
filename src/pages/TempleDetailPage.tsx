import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PujaCard from "@/components/PujaCard";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import heroImage from "@/assets/hero-temple.jpg";
import { demoPujas, demoTemples } from "@/lib/demoData";

export default function TempleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const temple = demoTemples.find((t) => t.id === id);
  const pujas = demoPujas.filter((p) => p.temples?.id === id);

  if (!temple) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12 text-center">
          <p className="text-4xl mb-4">🛕</p>
          <h1 className="font-display text-2xl font-bold">Temple Not Found</h1>
          <Button variant="outline" className="mt-4" asChild>
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
        {/* Hero */}
        <div className="relative h-64 md:h-80 overflow-hidden bg-muted">
          <img src={heroImage} alt={temple.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="container">
              <h1 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">{temple.name}</h1>
              <div className="mt-2 flex items-center gap-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4" />
                <span>{temple.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          {temple.description && (
            <div className="max-w-3xl mb-10">
              <h2 className="font-display text-xl font-semibold mb-3">About This Temple</h2>
              <p className="text-muted-foreground whitespace-pre-line">{temple.description}</p>
            </div>
          )}

          {pujas.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-semibold mb-6">Pujas at This Temple</h2>
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

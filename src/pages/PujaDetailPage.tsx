import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Star } from "lucide-react";
import pujaImage from "@/assets/puja-thali.jpg";
import { demoPujas } from "@/lib/demoData";

export default function PujaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const puja = demoPujas.find((p) => p.id === id);

  if (!puja) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12 text-center">
          <p className="text-4xl mb-4">🙏</p>
          <h1 className="font-display text-2xl font-bold">Puja Not Found</h1>
          <Button variant="outline" className="mt-4" asChild>
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
      <main className="flex-1">
        <div className="container py-8">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Image */}
            <div className="lg:col-span-3">
              <div className="aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                <img src={pujaImage} alt={puja.name} className="h-full w-full object-cover" />
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-3">
                {puja.is_featured && <Badge className="bg-gradient-saffron text-primary-foreground">Featured</Badge>}
                {puja.category && <Badge variant="secondary">{puja.category}</Badge>}
              </div>
              <h1 className="font-display text-3xl font-bold">{puja.name}</h1>
              <p className="mt-1 text-lg text-muted-foreground">{puja.deity}</p>

              {puja.temples && (
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <Link to={`/temples/${puja.temples.id}`} className="hover:text-foreground transition-colors">
                    {puja.temples.name}, {puja.temples.location}
                  </Link>
                </div>
              )}

              {puja.duration && (
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Duration: {puja.duration}</span>
                </div>
              )}

              <div className="mt-6 rounded-xl border border-border bg-card p-6">
                <div className="text-center">
                  <span className="font-display text-4xl font-bold text-primary">
                    ₹{puja.price.toLocaleString("en-IN")}
                  </span>
                  <p className="mt-1 text-sm text-muted-foreground">per ceremony</p>
                </div>
                <Button variant="saffron" size="lg" className="mt-4 w-full" asChild>
                  <Link to={`/book/${puja.id}`}>Book This Puja</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Description sections */}
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {puja.description && (
              <div>
                <h2 className="font-display text-xl font-semibold mb-3">About This Puja</h2>
                <p className="text-muted-foreground whitespace-pre-line">{puja.description}</p>
              </div>
            )}
            {puja.benefits && (
              <div>
                <h2 className="font-display text-xl font-semibold mb-3">Benefits</h2>
                <p className="text-muted-foreground whitespace-pre-line">{puja.benefits}</p>
              </div>
            )}
            {puja.preparation_instructions && (
              <div>
                <h2 className="font-display text-xl font-semibold mb-3">Preparation Instructions</h2>
                <p className="text-muted-foreground whitespace-pre-line">{puja.preparation_instructions}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TempleCard from "@/components/TempleCard";
import { demoTemples } from "@/lib/demoData";

export default function TemplesPage() {
  const temples = demoTemples;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-warm py-12">
          <div className="container">
            <h1 className="font-display text-3xl font-bold md:text-4xl">Our Temple Partners</h1>
            <p className="mt-2 text-muted-foreground">Sacred temples across India where your pujas are performed with devotion</p>
          </div>
        </section>
        <section className="container py-8">
          {temples.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {temples.map((t) => <TempleCard key={t.id} temple={t} />)}
            </div>
          ) : (
            <div className="py-16 text-center text-muted-foreground">
              <p className="text-4xl mb-2">🛕</p>
              <p>No temples available yet. Check back soon!</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

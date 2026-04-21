import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TempleCard from "@/components/TempleCard";
import { demoTemples } from "@/lib/demoData";

export default function TemplesPage() {
  const temples = demoTemples;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <section className="container py-12">
          <span className="label-mono-sm text-foreground/40">Index · Temples</span>
          <h1 className="mt-3 font-display text-4xl font-light leading-tight md:text-6xl">
            Our temple
            <br />
            <span className="text-gradient-iridescent italic">partners</span>.
          </h1>
          <p className="mt-4 max-w-md text-sm text-foreground/60">
            Sacred temples across India where your pujas are performed with devotion.
          </p>
        </section>
        <section className="container pb-16">
          {temples.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {temples.map((t) => <TempleCard key={t.id} temple={t} />)}
            </div>
          ) : (
            <div className="py-16 text-center text-foreground/60">
              <p>No temples available yet. Check back soon.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

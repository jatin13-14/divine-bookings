import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PujaCard from "@/components/PujaCard";
import { demoPujas } from "@/lib/demoData";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { PujaScene } from "@/components/three/PujaScene";

export default function PujaListingPage() {
  const [search, setSearch] = useState("");
  const [deity, setDeity] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");

  const pujas = demoPujas;

  const deities = [...new Set(pujas.map((p) => p.deity))];
  const categories = [...new Set(pujas.map((p) => p.category).filter(Boolean))];

  const filtered = pujas.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.deity.toLowerCase().includes(search.toLowerCase());
    const matchDeity = deity === "all" || p.deity === deity;
    const matchCategory = category === "all" || p.category === category;
    return matchSearch && matchDeity && matchCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Cinematic 3D banner */}
        <section className="relative overflow-hidden bg-[#04060d] pt-32 pb-16">
          <div className="absolute inset-0 opacity-90">
            <PujaScene />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,rgba(0,0,0,0.75)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
          <div className="container relative z-10">
            <span className="label-mono-sm text-foreground/60 text-shadow-cosmic">Index · Pujas</span>
            <h1 className="mt-3 font-display text-4xl font-light leading-tight text-foreground md:text-6xl text-shadow-cosmic">
              All <span className="text-gradient-iridescent italic">pujas</span>.
            </h1>
            <p className="mt-3 max-w-md text-foreground/70 text-shadow-cosmic">
              Browse our collection of sacred ceremonies.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
                <Input
                  placeholder="Search pujas..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-card/70 border-border/60 backdrop-blur-md"
                />
              </div>
              <Select value={deity} onValueChange={setDeity}>
                <SelectTrigger className="w-full sm:w-48 bg-card/70 border-border/60 backdrop-blur-md">
                  <SelectValue placeholder="All Deities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Deities</SelectItem>
                  {deities.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full sm:w-48 bg-card/70 border-border/60 backdrop-blur-md">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((c) => <SelectItem key={c!} value={c!}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
        <section className="container py-12">
          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((puja) => <PujaCard key={puja.id} puja={puja} />)}
            </div>
          ) : (
            <div className="py-16 text-center text-foreground/60">
              <p>No pujas found. Try adjusting your filters.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

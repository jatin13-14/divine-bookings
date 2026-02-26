import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PujaCard from "@/components/PujaCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function PujaListingPage() {
  const [search, setSearch] = useState("");
  const [deity, setDeity] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");

  const { data: pujas, isLoading } = useQuery({
    queryKey: ["pujas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pujas")
        .select("*, temples(*)")
        .eq("is_active", true)
        .order("is_featured", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const deities = [...new Set(pujas?.map((p) => p.deity) ?? [])];
  const categories = [...new Set(pujas?.map((p) => p.category).filter(Boolean) ?? [])];

  const filtered = pujas?.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.deity.toLowerCase().includes(search.toLowerCase());
    const matchDeity = deity === "all" || p.deity === deity;
    const matchCategory = category === "all" || p.category === category;
    return matchSearch && matchDeity && matchCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-warm py-12">
          <div className="container">
            <h1 className="font-display text-3xl font-bold md:text-4xl">All Pujas</h1>
            <p className="mt-2 text-muted-foreground">Browse our collection of sacred ceremonies</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search pujas..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={deity} onValueChange={setDeity}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Deities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Deities</SelectItem>
                  {deities.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full sm:w-48">
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
        <section className="container py-8">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1,2,3].map(i => <div key={i} className="h-72 rounded-lg bg-muted animate-pulse" />)}
            </div>
          ) : filtered && filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((puja) => <PujaCard key={puja.id} puja={puja} />)}
            </div>
          ) : (
            <div className="py-16 text-center text-muted-foreground">
              <p className="text-4xl mb-2">🙏</p>
              <p>No pujas found. Try adjusting your filters.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

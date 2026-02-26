import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TempleCard from "@/components/TempleCard";

export default function TemplesPage() {
  const { data: temples, isLoading } = useQuery({
    queryKey: ["temples"],
    queryFn: async () => {
      const { data, error } = await supabase.from("temples").select("*").eq("is_active", true);
      if (error) throw error;
      return data;
    },
  });

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
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1,2,3].map(i => <div key={i} className="h-60 rounded-lg bg-muted animate-pulse" />)}
            </div>
          ) : temples && temples.length > 0 ? (
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

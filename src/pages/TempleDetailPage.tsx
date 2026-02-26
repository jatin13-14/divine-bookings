import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PujaCard from "@/components/PujaCard";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function TempleDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: temple } = useQuery({
    queryKey: ["temple", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("temples").select("*").eq("id", id!).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: pujas } = useQuery({
    queryKey: ["temple-pujas", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pujas")
        .select("*, temples(*)")
        .eq("temple_id", id!)
        .eq("is_active", true);
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (!temple) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12 text-center">
          <div className="h-60 rounded-lg bg-muted animate-pulse" />
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
          {temple.image_url ? (
            <img src={temple.image_url} alt={temple.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl bg-secondary">🛕</div>
          )}
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

          {pujas && pujas.length > 0 && (
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

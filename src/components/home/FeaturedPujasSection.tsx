import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import PujaCard from "@/components/PujaCard";

export interface FeaturedPuja {
  id: string;
  name: string;
  deity: string;
  price: number;
  is_featured?: boolean;
  category?: string | null;
  temples?: {
    id: string;
    name: string;
    location: string;
  } | null;
}

export function FeaturedPujasSection(props: {
  pujas: FeaturedPuja[] | undefined;
  isLoading: boolean;
  isError: boolean;
}) {
  const { pujas, isLoading, isError } = props;
  return (
    <section id="special-pujas" className="py-16 md:py-20">
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Special Pujas</h2>
          <p className="mt-2 text-muted-foreground">
            Begin your journey with ceremonies chosen for peace, protection, and prosperity.
          </p>
        </div>

        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-lg border border-border shadow-card">
                <Skeleton className="aspect-[4/3] w-full rounded-none" />
                <div className="p-4">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="mt-2 h-4 w-1/2" />
                  <Skeleton className="mt-4 h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card">
            <h3 className="font-display text-lg font-semibold">Couldn’t load featured pujas</h3>
            <p className="mt-2 text-sm text-muted-foreground">Please try again in a moment.</p>
            <Button className="mt-5" variant="saffron" asChild>
              <Link to="/pujas">Browse all pujas</Link>
            </Button>
          </div>
        )}

        {!isLoading && !isError && (!pujas || pujas.length === 0) && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card">
            <h3 className="font-display text-lg font-semibold">No featured pujas yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Add some pujas in Supabase and mark them as featured to display here.
            </p>
            <Button className="mt-5" variant="outline" asChild>
              <Link to="/pujas">View all pujas</Link>
            </Button>
          </div>
        )}

        {!isLoading && !isError && pujas && pujas.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pujas.map((puja) => (
                <PujaCard key={puja.id} puja={puja} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button variant="outline" size="lg" asChild>
                <Link to="/pujas">View all pujas →</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}


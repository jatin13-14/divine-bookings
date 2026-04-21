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
    <section id="special-pujas" className="py-24">
      <div className="container">
        <div className="mb-14 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label-mono-sm text-foreground/40">Index · 03 / Pujas</span>
            <h2 className="mt-3 font-display text-4xl font-light leading-tight md:text-6xl">
              Special
              <br />
              <span className="text-gradient-iridescent italic">ceremonies</span>.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-foreground/60">
            Begin your journey with ceremonies chosen for
            peace, protection, and prosperity.
          </p>
        </div>

        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-lg border border-border/60 bg-card/40">
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
          <div className="rounded-2xl border border-border/60 bg-card/40 p-10 text-center backdrop-blur-md">
            <h3 className="font-display text-xl font-light">Couldn't load featured pujas</h3>
            <p className="mt-2 text-sm text-foreground/60">Please try again in a moment.</p>
            <Button className="mt-6" variant="hero" asChild>
              <Link to="/pujas">Browse all pujas</Link>
            </Button>
          </div>
        )}

        {!isLoading && !isError && (!pujas || pujas.length === 0) && (
          <div className="rounded-2xl border border-border/60 bg-card/40 p-10 text-center backdrop-blur-md">
            <h3 className="font-display text-xl font-light">No featured pujas yet</h3>
            <p className="mt-2 text-sm text-foreground/60">
              Mark some pujas as featured to display here.
            </p>
            <Button className="mt-6" variant="outline" asChild>
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
            <div className="mt-12 flex justify-center">
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

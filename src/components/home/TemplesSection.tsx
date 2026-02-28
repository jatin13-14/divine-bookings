import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import TempleCard from "@/components/TempleCard";

export interface HomeTemple {
  id: string;
  name: string;
  location: string;
  description?: string | null;
}

export function TemplesSection(props: {
  temples: HomeTemple[] | undefined;
  isLoading: boolean;
  isError: boolean;
}) {
  const { temples, isLoading, isError } = props;
  return (
    <section id="temples" className="py-16 md:py-20">
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Temples of India</h2>
          <p className="mt-2 text-muted-foreground">
            Trusted temple partners where your pujas are performed with devotion and care.
          </p>
        </div>

        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-lg border border-border shadow-card">
                <Skeleton className="aspect-[16/9] w-full rounded-none" />
                <div className="p-4">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="mt-2 h-4 w-1/2" />
                  <Skeleton className="mt-4 h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card">
            <h3 className="font-display text-lg font-semibold">Couldn’t load temples</h3>
            <p className="mt-2 text-sm text-muted-foreground">Please try again in a moment.</p>
            <Button className="mt-5" variant="outline" asChild>
              <Link to="/temples">Browse all temples</Link>
            </Button>
          </div>
        )}

        {!isLoading && !isError && (!temples || temples.length === 0) && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card">
            <h3 className="font-display text-lg font-semibold">No temples yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Add temple partners in Supabase to show them here.
            </p>
            <Button className="mt-5" variant="outline" asChild>
              <Link to="/temples">View temples</Link>
            </Button>
          </div>
        )}

        {!isLoading && !isError && temples && temples.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {temples.map((temple) => (
                <TempleCard key={temple.id} temple={temple} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button variant="outline" size="lg" asChild>
                <Link to="/temples">View all temples →</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}


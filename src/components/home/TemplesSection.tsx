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
    <section id="temples" className="py-24">
      <div className="container">
        <div className="mb-14 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label-mono-sm text-foreground/40">Index · 04 / Temples</span>
            <h2 className="mt-3 font-display text-4xl font-light leading-tight md:text-6xl">
              Temples
              <br />
              <span className="text-gradient-iridescent italic">of India</span>.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-foreground/60">
            Trusted partners where your pujas are performed
            with devotion and care.
          </p>
        </div>

        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-lg border border-border/60 bg-card/40">
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
          <div className="rounded-2xl border border-border/60 bg-card/40 p-10 text-center backdrop-blur-md">
            <h3 className="font-display text-xl font-light">Couldn't load temples</h3>
            <p className="mt-2 text-sm text-foreground/60">Please try again in a moment.</p>
            <Button className="mt-6" variant="outline" asChild>
              <Link to="/temples">Browse all temples</Link>
            </Button>
          </div>
        )}

        {!isLoading && !isError && (!temples || temples.length === 0) && (
          <div className="rounded-2xl border border-border/60 bg-card/40 p-10 text-center backdrop-blur-md">
            <h3 className="font-display text-xl font-light">No temples yet</h3>
            <p className="mt-2 text-sm text-foreground/60">
              Add temple partners to show them here.
            </p>
            <Button className="mt-6" variant="outline" asChild>
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
            <div className="mt-12 flex justify-center">
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

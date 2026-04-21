import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Card3D } from "@/components/three/Card3D";
import { PujaScene } from "@/components/three/PujaScene";
import { ArrowUpRight } from "lucide-react";

interface PujaCardProps {
  puja: {
    id: string;
    name: string;
    deity: string;
    price: number;
    is_featured?: boolean;
    category?: string | null;
    temples?: { name: string; location: string } | null;
  };
}

export default function PujaCard({ puja }: PujaCardProps) {
  return (
    <Card3D className="h-full" intensity={6}>
      <Link to={`/pujas/${puja.id}`} className="block h-full">
        <Card className="group relative h-full overflow-hidden border-border/60 bg-card/40 backdrop-blur-md transition-all duration-500 hover:border-primary/40 hover:bg-card/70 hover:shadow-[0_0_60px_-15px_hsl(30_90%_58%/0.4)]">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#06080f]" style={{ transform: "translateZ(20px)" }}>
            <PujaScene />
            {puja.is_featured && (
              <div className="absolute left-3 top-3">
                <span className="label-mono-sm rounded-full border border-primary/40 bg-background/70 px-2.5 py-1 text-primary backdrop-blur-md">
                  ★ Featured
                </span>
              </div>
            )}
            {/* Iridescent edge on hover */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-iridescent transition-transform duration-500 group-hover:scale-x-100" />
          </div>
          <CardContent className="p-5" style={{ transform: "translateZ(30px)" }}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-display text-xl font-light leading-tight truncate">{puja.name}</h3>
                <p className="mt-1 label-mono-sm text-foreground/50">{puja.deity}</p>
              </div>
              <span className="shrink-0 font-display text-xl font-light text-primary">
                ₹{puja.price.toLocaleString("en-IN")}
              </span>
            </div>
            {puja.temples && (
              <p className="mt-3 text-xs text-foreground/55 truncate">
                {puja.temples.name} · {puja.temples.location}
              </p>
            )}
            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
              {puja.category ? (
                <span className="label-mono-sm text-foreground/50">{puja.category}</span>
              ) : <span />}
              <span className="inline-flex items-center gap-1 label-mono-sm text-foreground/50 transition-colors group-hover:text-primary">
                View <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </Card3D>
  );
}

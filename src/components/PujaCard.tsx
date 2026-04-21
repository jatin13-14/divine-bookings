import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Card3D } from "@/components/three/Card3D";
import { PujaScene } from "@/components/three/PujaScene";

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
    <Card3D className="h-full">
      <Link to={`/pujas/${puja.id}`} className="block h-full">
        <Card className="group h-full overflow-hidden border-border bg-card shadow-[0_10px_30px_-12px_rgba(20,20,15,0.25)] transition-shadow duration-300 hover:shadow-[0_20px_50px_-15px_rgba(217,122,44,0.45)]">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#1a0a04]" style={{ transform: "translateZ(20px)" }}>
            <PujaScene />
            {puja.is_featured && (
              <div className="absolute left-3 top-3">
                <Badge className="bg-gradient-saffron text-primary-foreground shadow-warm">Featured</Badge>
              </div>
            )}
          </div>
          <CardContent className="p-4" style={{ transform: "translateZ(30px)" }}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-display text-lg font-semibold leading-tight truncate">{puja.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{puja.deity}</p>
              </div>
              <span className="shrink-0 font-display text-lg font-bold text-primary">
                ₹{puja.price.toLocaleString("en-IN")}
              </span>
            </div>
            {puja.temples && (
              <p className="mt-2 text-xs text-muted-foreground truncate">
                📍 {puja.temples.name}, {puja.temples.location}
              </p>
            )}
            {puja.category && (
              <div className="mt-3">
                <Badge variant="secondary" className="text-xs">{puja.category}</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </Card3D>
  );
}

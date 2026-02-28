import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import pujaImage from "@/assets/puja-thali.jpg";

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
    <Link to={`/pujas/${puja.id}`}>
      <Card className="group overflow-hidden border-border shadow-card hover:shadow-warm transition-all duration-300">
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={pujaImage}
            alt={puja.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <CardContent className="p-4">
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
          <div className="mt-3 flex gap-2">
            {puja.is_featured && <Badge variant="default" className="bg-gradient-saffron text-primary-foreground text-xs">Featured</Badge>}
            {puja.category && <Badge variant="secondary" className="text-xs">{puja.category}</Badge>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-temple.jpg";

interface TempleCardProps {
  temple: {
    id: string;
    name: string;
    location: string;
    description?: string | null;
  };
}

export default function TempleCard({ temple }: TempleCardProps) {
  return (
    <Link to={`/temples/${temple.id}`}>
      <Card className="group overflow-hidden border-border shadow-card hover:shadow-warm transition-all duration-300">
        <div className="aspect-[16/9] overflow-hidden bg-muted">
          <img
            src={heroImage}
            alt={temple.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-display text-lg font-semibold">{temple.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">📍 {temple.location}</p>
          {temple.description && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{temple.description}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

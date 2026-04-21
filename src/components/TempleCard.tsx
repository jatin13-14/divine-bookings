import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Card3D } from "@/components/three/Card3D";
import { TempleScene } from "@/components/three/TempleScene";

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
    <Card3D className="h-full">
      <Link to={`/temples/${temple.id}`} className="block h-full">
        <Card className="group h-full overflow-hidden border-border bg-card shadow-[0_10px_30px_-12px_rgba(20,20,15,0.25)] transition-shadow duration-300 hover:shadow-[0_20px_50px_-15px_rgba(217,122,44,0.45)]">
          <div className="aspect-[16/9] overflow-hidden bg-[#1a0a04]" style={{ transform: "translateZ(20px)" }}>
            <TempleScene />
          </div>
          <CardContent className="p-4" style={{ transform: "translateZ(30px)" }}>
            <h3 className="font-display text-lg font-semibold">{temple.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">📍 {temple.location}</p>
            {temple.description && (
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{temple.description}</p>
            )}
          </CardContent>
        </Card>
      </Link>
    </Card3D>
  );
}

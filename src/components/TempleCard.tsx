import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Card3D } from "@/components/three/Card3D";
import { TempleScene } from "@/components/three/TempleScene";
import { ArrowUpRight } from "lucide-react";

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
    <Card3D className="h-full" intensity={6}>
      <Link to={`/temples/${temple.id}`} className="block h-full">
        <Card className="group relative h-full overflow-hidden border-border/60 bg-card/40 backdrop-blur-md transition-all duration-500 hover:border-primary/40 hover:bg-card/70 hover:shadow-[0_0_60px_-15px_hsl(30_90%_58%/0.4)]">
          <div className="aspect-[16/9] overflow-hidden bg-[#06080f]" style={{ transform: "translateZ(20px)" }}>
            <TempleScene />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-iridescent transition-transform duration-500 group-hover:scale-x-100" />
          </div>
          <CardContent className="p-5" style={{ transform: "translateZ(30px)" }}>
            <h3 className="font-display text-xl font-light">{temple.name}</h3>
            <p className="mt-1 label-mono-sm text-foreground/50">{temple.location}</p>
            {temple.description && (
              <p className="mt-3 text-sm text-foreground/65 line-clamp-2">{temple.description}</p>
            )}
            <div className="mt-4 flex items-center justify-end border-t border-border/60 pt-3">
              <span className="inline-flex items-center gap-1 label-mono-sm text-foreground/50 transition-colors group-hover:text-primary">
                Visit <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </Card3D>
  );
}

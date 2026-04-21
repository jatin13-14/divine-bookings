import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number; // tilt strength in degrees
  glare?: boolean;
}

/**
 * Real CSS 3D tilt wrapper. Uses perspective + rotateX/rotateY based on
 * pointer position. Feels physical without WebGL cost.
 */
export function Card3D({ children, className, intensity = 10, glare = true }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * intensity;
    const ry = (px - 0.5) * intensity;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("group relative [perspective:1200px]", className)}
    >
      <div
        className="relative h-full w-full transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateZ(0)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
        {glare && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200 group-hover:opacity-60 mix-blend-overlay"
            style={{
              background:
                "radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,220,160,0.55), transparent 55%)",
            }}
          />
        )}
      </div>
    </div>
  );
}

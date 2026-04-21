import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";

interface SceneProps {
  children: ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
  className?: string;
  dpr?: CanvasProps["dpr"];
  shadows?: boolean;
  ambient?: boolean;
}

/**
 * Lightweight wrapper around <Canvas> with sensible defaults
 * and warm, temple-style three-point lighting.
 */
export function Scene({
  children,
  cameraPosition = [0, 1.5, 6],
  fov = 45,
  className,
  dpr = [1, 1.75],
  shadows = false,
  ambient = true,
}: SceneProps) {
  return (
    <Canvas
      shadows={shadows}
      dpr={dpr}
      camera={{ position: cameraPosition, fov }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      {ambient && (
        <>
          <ambientLight intensity={0.55} color="#fff1d8" />
          <directionalLight position={[5, 8, 4]} intensity={1.1} color="#ffd9a0" />
          <directionalLight position={[-4, 3, -3]} intensity={0.5} color="#ff7a3a" />
          <pointLight position={[0, 4, 2]} intensity={0.6} color="#ffb060" />
        </>
      )}
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}

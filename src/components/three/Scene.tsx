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
 * Active-Theory style cinematic lighting:
 * very low ambient, cool cyan rim from one side, warm saffron key from the other.
 * Devotional warmth meets cosmic depth.
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
          {/* Very low ambient for cinematic darkness */}
          <ambientLight intensity={0.18} color="#9bb8ff" />
          {/* Warm saffron key light */}
          <directionalLight position={[4, 6, 5]} intensity={1.4} color="#ffb060" />
          {/* Cool cyan rim — Active Theory signature */}
          <directionalLight position={[-5, 3, -4]} intensity={0.9} color="#5fc4ff" />
          {/* Magenta accent fill */}
          <pointLight position={[0, 4, 3]} intensity={0.7} color="#c870ff" distance={12} />
          {/* Saffron underglow */}
          <pointLight position={[0, -2, 2]} intensity={0.5} color="#ff8a3a" distance={8} />
        </>
      )}
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}

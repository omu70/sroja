// ------------------------------------------------------------------------
// 3D Thread Object
//
// A small spinning 3D brass shape (decorative).
// ------------------------------------------------------------------------

"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * “The Thread” — an abstract woven form in burnished brass.
 * A quiet 3D object, not a gimmick: it turns at the pace of a loom.
 */
function Thread() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.12;
    mesh.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.18) * 0.18 + 0.25;
  });

  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[1.05, 0.3, 320, 48, 2, 5]} />
      <meshStandardMaterial
        color="#a0804a"
        metalness={0.92}
        roughness={0.32}
        envMapIntensity={1.1}
      />
    </mesh>
  );
}

export default function LoomObject({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 4.4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 5, 6]} intensity={2.1} color="#f6e7c5" />
          <directionalLight position={[-6, -3, -4]} intensity={0.5} color="#5a708a" />
          <pointLight position={[0, 2, 2]} intensity={0.6} color="#c6a75e" />
          <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.55}>
            <Thread />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
